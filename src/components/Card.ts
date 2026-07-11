import type { CardData, HandleCardClick } from "../types/types.js";

export class Card {
  private name: string;
  private link: string;
  private selector: string;
  private handleCardClick: HandleCardClick;
  private element!: HTMLElement;
  private cardImageElement!: HTMLImageElement;

  constructor(
    { name, link }: CardData,
    selector: string,
    handleCardClick: HandleCardClick,
  ) {
    this.name = name;
    this.link = link;
    this.selector = selector;
    this.handleCardClick = handleCardClick;
  }

  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(
      this.selector,
    ) as HTMLTemplateElement;

    return cardTemplate.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;
  }

  private setEventListeners(): void {
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;

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

  generateCard(): HTMLElement {
    this.element = this.getTemplate();

    this.cardImageElement = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    const cardTitleElement = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;

    this.cardImageElement.src = this.link;
    this.cardImageElement.alt = this.name;
    cardTitleElement.textContent = this.name;

    this.setEventListeners();

    return this.element;
  }
}