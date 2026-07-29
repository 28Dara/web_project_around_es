export class Card {
    data;
    selector;
    currentUserId;
    handleCardClick;
    element;
    cardImageElement;
    handleCardDelete;
    constructor(data, selector, currentUserId, handleCardClick, handleCardDelete) {
        this.data = data;
        this.selector = selector;
        this.currentUserId = currentUserId;
        this.handleCardClick = handleCardClick;
        this.handleCardDelete = handleCardDelete;
    }
    isOwner() {
        return this.data.owner === this.currentUserId;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.selector);
        return cardTemplate.content
            .querySelector('.card')
            .cloneNode(true);
    }
    setEventListeners(deleteButton) {
        const likeButton = this.element.querySelector('.card__like-button');
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('card__like-button_is-active');
        });
        deleteButton?.addEventListener('click', () => {
            this.handleCardDelete(this.data._id, this.element);
        });
        this.cardImageElement.addEventListener('click', () => {
            this.handleCardClick(this.data.name, this.data.link);
        });
    }
    generateCard() {
        this.element = this.getTemplate();
        this.cardImageElement = this.element.querySelector('.card__image');
        const cardTitleElement = this.element.querySelector('.card__title');
        let deleteButton = this.element.querySelector('.card__delete-button');
        this.cardImageElement.src = this.data.link;
        this.cardImageElement.alt = this.data.name;
        cardTitleElement.textContent = this.data.name;
        if (!this.isOwner()) {
            deleteButton?.remove();
            deleteButton = null;
        }
        this.setEventListeners(deleteButton);
        return this.element;
    }
}
