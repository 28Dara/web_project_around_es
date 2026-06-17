const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Selectores
const editBtn = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeEditBtn = editModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description",
);
const form = editModal.querySelector("#edit-profile-form");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsContainer = document.querySelector(".cards__list");
const addCardBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = newCardModal.querySelector("#new-card-form");
const closeNewCardBtn = newCardModal.querySelector(".popup__close");
const cardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupBtn = imagePopup.querySelector(".popup__close");

// Funciones
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editModal);
}

function handleOpenNewCardModal() {
  openModal(newCardModal);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCardData);
  closeModal(newCardModal);
  newCardForm.reset();
}

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
}) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  const cardlikeBtn = cardElement.querySelector(".card__like-button");
  cardlikeBtn.addEventListener("click", () => {
    cardlikeBtn.classList.toggle("card__like-button_is-active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsContainer.prepend(cardElement);
}

import { enableValidation } from "./validate.js";

enableValidation();

// Event Listeners
editBtn.addEventListener("click", handleOpenEditModal);
form.addEventListener("submit", handleProfileFormSubmit);

closeEditBtn.addEventListener("click", () => {
  closeModal(editModal);
});

initialCards.forEach((data) => {
  renderCard(data);
});

addCardBtn.addEventListener("click", handleOpenNewCardModal);
newCardForm.addEventListener("submit", handleNewCardFormSubmit);

closeNewCardBtn.addEventListener("click", () => {
  closeModal(newCardModal);
});

closeImagePopupBtn.addEventListener("click", () => {
  closeModal(imagePopup);
});
