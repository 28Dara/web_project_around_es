import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { defaultFormConfig, apiConfig } from './utils/constants.js';
import type { CardData, FormValues } from './types/types.js';
import { Api } from './components/Api.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__description',
});

const api = new Api(apiConfig);

function handleCardClick(name: string, link: string): void {
  imagePopup.open({ name, link });
}

function createCard(item: CardData): void {
  const cardElement = new Card(
    item,
    '#card-template',
    handleCardClick
  ).generateCard();
  cardListSection.addItem(cardElement);
}

const cardListSection = new Section<CardData>(
  {
    renderer: createCard,
  },
  '.cards__list'
);

const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();

function handleEditFormSubmit(data: FormValues): void {
  userInfo.setUserInfo({ name: data.name, job: data.description });
}

const editPopup = new PopupWithForm('#edit-popup', handleEditFormSubmit);
editPopup.setEventListeners();

function handleAddCardSubmit(data: FormValues): void {
  const newCardData: CardData = { name: data.place, link: data.link };
  createCard(newCardData);
}

const newCardPopup = new PopupWithForm('#new-card-popup', handleAddCardSubmit);
newCardPopup.setEventListeners();

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
