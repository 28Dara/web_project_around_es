export class Card {
    name;
    link;
    selector;
    handleCardClick;
    element;
    cardImageElement;
    constructor({ name, link }, selector, handleCardClick) {
        this.name = name;
        this.link = link;
        this.selector = selector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.selector);
        return cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
    }
    setEventListeners() {
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        deleteButton.addEventListener("click", () => {
            this.element.remove();
        });
        this.cardImageElement.addEventListener("click", () => {
            this.handleCardClick(this.name, this.link);
        });
    }
    generateCard() {
        this.element = this.getTemplate();
        this.cardImageElement = this.element.querySelector(".card__image");
        const cardTitleElement = this.element.querySelector(".card__title");
        this.cardImageElement.src = this.link;
        this.cardImageElement.alt = this.name;
        cardTitleElement.textContent = this.name;
        this.setEventListeners();
        return this.element;
    }
}
