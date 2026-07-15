import { FormValidator } from './components/FormValidator.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { defaultFormConfig, initialCards } from './utils/constants.js';
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__description',
});
function handleCardClick(name, link) {
    imagePopup.open({ name, link });
}
function renderCard(item) {
    const cardElement = new Card(item, '#card-template', handleCardClick).generateCard();
    cardListSection.addItem(cardElement);
}
const cardListSection = new Section({
    items: initialCards,
    renderer: renderCard,
}, '.cards__list');
const imagePopup = new PopupWithImage('#image-popup');
imagePopup.setEventListeners();
function handleEditFormSubmit(data) {
    userInfo.setUserInfo({ name: data.name, job: data.description });
}
const editPopup = new PopupWithForm('#edit-popup', handleEditFormSubmit);
editPopup.setEventListeners();
function handleAddCardSubmit(data) {
    const newCardData = { name: data.place, link: data.link };
    renderCard(newCardData);
}
const newCardPopup = new PopupWithForm('#new-card-popup', handleAddCardSubmit);
newCardPopup.setEventListeners();
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
cardListSection.renderItems();
