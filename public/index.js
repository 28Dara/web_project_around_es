import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { defaultFormConfig, apiConfig } from './utils/constants.js';
import { Api } from './components/Api.js';
import { PopupWithConfirmation } from './components/PopupWithConfirmation.js';
const api = new Api(apiConfig);
let currentUserId;
let cardListSection;
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
const avatarFormValidator = new FormValidator(defaultFormConfig, document.querySelector('#avatar-form'));
avatarFormValidator.enableValidation();
const editFormValidator = new FormValidator(defaultFormConfig, document.querySelector('#edit-profile-form'));
editFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(defaultFormConfig, document.querySelector('#new-card-form'));
addCardFormValidator.enableValidation();
const nameInput = document.querySelector('#name-input');
const descriptionInput = document.querySelector('#description-input');
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
    if (nameInput.value === '' && descriptionInput.value === '') {
        const currentInfo = userInfo.getUserInfo();
        nameInput.value = currentInfo.name;
        descriptionInput.value = currentInfo.job;
    }
    editFormValidator.resetValidation();
    editPopup.open();
});
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
    addCardFormValidator.resetValidation();
    newCardPopup.open();
});
const avatarWrapper = document.querySelector('.profile__avatar-wrapper');
avatarWrapper.addEventListener('click', () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
function handleCardClick(name, link) {
    imagePopup.open({ name, link });
}
function handleCardDelete(cardId, cardElement) {
    deletePopup.setSubmitAction(async () => {
        try {
            await api.deleteCard(cardId);
            cardElement.remove();
        }
        catch (err) {
            console.error('Error al eliminar la tarjeta:', err);
        }
    });
    deletePopup.open();
}
async function handleCardLike(cardId, isLiked) {
    try {
        const updatedCard = await api.changeLikeCardStatus(cardId, isLiked);
        return updatedCard.isLiked;
    }
    catch (err) {
        console.error('Error al actualizar el like', err);
        return isLiked;
    }
}
function createCard(item) {
    const cardElement = new Card(item, '#card-template', currentUserId, handleCardClick, handleCardDelete, handleCardLike).generateCard();
    cardListSection.addItem(cardElement);
}
async function handleEditFormSubmit(data) {
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
    }
    catch (err) {
        console.error('Error al actualizar el perfil:', err);
    }
    finally {
        editPopup.renderLoading(false);
    }
}
async function handleAddCardSubmit(data) {
    try {
        newCardPopup.renderLoading(true, 'Creando...');
        const newCardData = await api.addCard({
            name: data.place,
            link: data.link,
        });
        createCard(newCardData);
        newCardPopup.close();
    }
    catch (err) {
        console.error('Error al crear la tarjeta:', err);
    }
    finally {
        newCardPopup.renderLoading(false);
    }
}
async function handleAvatarFormSubmit(data) {
    try {
        avatarPopup.renderLoading(true);
        const updatedUser = await api.updateAvatar({ avatar: data.avatar });
        userInfo.setUserInfo({
            name: updatedUser.name,
            job: updatedUser.about,
            avatar: updatedUser.avatar,
        });
        avatarPopup.close();
    }
    catch (err) {
        console.error('Error al actualizar la foto de perfil:', err);
    }
    finally {
        avatarPopup.renderLoading(false);
    }
}
async function loadInitialData() {
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
        cardListSection = new Section({ items: cards, renderer: createCard }, '.cards__list');
        cardListSection.renderItems();
    }
    catch (err) {
        console.error('Error al cargar los datos iniciales:', err);
    }
}
loadInitialData();
