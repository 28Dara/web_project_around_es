export class Card {
    data;
    selector;
    currentUserId;
    handleCardClick;
    handleCardDelete;
    handleCardLike;
    element;
    cardImageElement;
    likeButton;
    constructor(data, selector, currentUserId, handleCardClick, handleCardDelete, handleCardLike) {
        this.data = data;
        this.selector = selector;
        this.currentUserId = currentUserId;
        this.handleCardClick = handleCardClick;
        this.handleCardDelete = handleCardDelete;
        this.handleCardLike = handleCardLike;
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
    updateLikeState(isLiked) {
        this.data.isLiked = isLiked;
        this.likeButton.classList.toggle('card__like-button_is-active', isLiked);
    }
    setEventListeners(deleteButton) {
        this.likeButton.addEventListener('click', async () => {
            const isNowLiked = await this.handleCardLike(this.data._id, this.data.isLiked);
            this.updateLikeState(isNowLiked);
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
        this.likeButton = this.element.querySelector('.card__like-button');
        let deleteButton = this.element.querySelector('.card__delete-button');
        this.cardImageElement.src = this.data.link;
        this.cardImageElement.alt = this.data.name;
        cardTitleElement.textContent = this.data.name;
        this.likeButton.classList.toggle('card__like-button_is-active', this.data.isLiked);
        if (!this.isOwner()) {
            deleteButton?.remove();
            deleteButton = null;
        }
        this.setEventListeners(deleteButton);
        return this.element;
    }
}
