import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { defaultFormConfig, apiConfig } from './utils/constants.js';
import type { CardData, FormValues } from './types/types.js';
import { Api } from './components/Api.js';
import { PopupWithConfirmation } from './components/PopupWithConfirmation.js';

const api = new Api(apiConfig);
let currentUserId: string;
let cardListSection: Section<CardData>;

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__image',
});

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation('#delete-popup');
deletePopup.setEventListeners();

const editPopup = new PopupWithForm('#edit-popup', handleEditFormSubmit);
editPopup.setEventListeners();

const newCardPopup = new PopupWithForm('#new-card-popup', handleAddCardSubmit);
newCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#avatar-popup', handleAvatarFormSubmit);
avatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator(
  defaultFormConfig,
  document.querySelector('#avatar-form') as HTMLFormElement
);
avatarFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  defaultFormConfig,
  document.querySelector('#edit-profile-form') as HTMLFormElement
);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  defaultFormConfig,
  document.querySelector('#new-card-form') as HTMLFormElement
);
addCardFormValidator.enableValidation();

const nameInput = document.querySelector('#name-input') as HTMLInputElement;

const descriptionInput = document.querySelector(
  '#description-input'
) as HTMLInputElement;

const editButton = document.querySelector(
  '.profile__edit-button'
) as HTMLButtonElement;
editButton.addEventListener('click', () => {
  if (nameInput.value === '' && descriptionInput.value === '') {
    const currentInfo = userInfo.getUserInfo();
    nameInput.value = currentInfo.name;
    descriptionInput.value = currentInfo.job;
  }
  editFormValidator.resetValidation();
  editPopup.open();
});

const addButton = document.querySelector(
  '.profile__add-button'
) as HTMLButtonElement;
addButton.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});

const avatarWrapper = document.querySelector(
  '.profile__avatar-wrapper'
) as HTMLElement;
avatarWrapper.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

function handleCardClick(name: string, link: string): void {
  imagePopup.open({ name, link });
}

function handleCardDelete(cardId: string, cardElement: HTMLElement): void {
  deletePopup.setSubmitAction(async () => {
    try {
      await api.deleteCard(cardId);
      cardElement.remove();
    } catch (err) {
      console.error('Error al eliminar la tarjeta:', err);
    }
  });
  deletePopup.open();
}

async function handleCardLike(
  cardId: string,
  isLiked: boolean
): Promise<boolean> {
  try {
    const updatedCard = await api.changeLikeCardStatus(cardId, isLiked);
    return updatedCard.isLiked;
  } catch (err) {
    console.error('Error al actualizar el like', err);
    return isLiked;
  }
}

function createCard(item: CardData): void {
  const cardElement = new Card(
    item,
    '#card-template',
    currentUserId,
    handleCardClick,
    handleCardDelete,
    handleCardLike
  ).generateCard();
  cardListSection.addItem(cardElement);
}

async function handleEditFormSubmit(data: FormValues): Promise<void> {
  try {
    editPopup.renderLoading(true);
    const updatedUser = await api.editUserInfo({
      name: data.name,
      about: data.description,
    });
    userInfo.setUserInfo({
      name: updatedUser.name,
      job: updatedUser.about,
      avatar: updatedUser.avatar,
    });
    editPopup.close();
  } catch (err) {
    console.error('Error al actualizar el perfil:', err);
  } finally {
    editPopup.renderLoading(false);
  }
}

async function handleAddCardSubmit(data: FormValues): Promise<void> {
  try {
    newCardPopup.renderLoading(true, 'Creando...');
    const newCardData = await api.addCard({
      name: data.place,
      link: data.link,
    });
    createCard(newCardData);
    newCardPopup.close();
  } catch (err) {
    console.error('Error al crear la tarjeta:', err);
  } finally {
    newCardPopup.renderLoading(false);
  }
}

async function handleAvatarFormSubmit(data: FormValues): Promise<void> {
  try {
    avatarPopup.renderLoading(true);
    const updatedUser = await api.updateAvatar({ avatar: data.avatar });
    userInfo.setUserInfo({
      name: updatedUser.name,
      job: updatedUser.about,
      avatar: updatedUser.avatar,
    });
    avatarPopup.close();
  } catch (err) {
    console.error('Error al actualizar la foto de perfil:', err);
  } finally {
    avatarPopup.renderLoading(false);
  }
}

async function loadInitialData(): Promise<void> {
  try {
    const [userData, cards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    currentUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardListSection = new Section<CardData>(
      { items: cards, renderer: createCard },
      '.cards__list'
    );
    cardListSection.renderItems();
  } catch (err) {
    console.error('Error al cargar los datos iniciales:', err);
  }
}

loadInitialData();
