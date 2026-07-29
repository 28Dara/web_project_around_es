import type {
  CardData,
  HandleCardClick,
  HandleCardDelete,
} from '../types/types.js';

export class Card {
  private data: CardData;
  private selector: string;
  private currentUserId: string;
  private handleCardClick: HandleCardClick;
  private element!: HTMLElement;
  private cardImageElement!: HTMLImageElement;
  private handleCardDelete: HandleCardDelete;

  constructor(
    data: CardData,
    selector: string,
    currentUserId: string,
    handleCardClick: HandleCardClick,
    handleCardDelete: HandleCardDelete
  ) {
    this.data = data;
    this.selector = selector;
    this.currentUserId = currentUserId;
    this.handleCardClick = handleCardClick;
    this.handleCardDelete = handleCardDelete;
  }

  private isOwner(): boolean {
    return this.data.owner === this.currentUserId;
  }
  private getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(
      this.selector
    ) as HTMLTemplateElement;

    return cardTemplate.content
      .querySelector('.card')!
      .cloneNode(true) as HTMLElement;
  }

  private setEventListeners(deleteButton: HTMLButtonElement | null): void {
    const likeButton = this.element.querySelector(
      '.card__like-button'
    ) as HTMLButtonElement;

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

  generateCard(): HTMLElement {
    this.element = this.getTemplate();

    this.cardImageElement = this.element.querySelector(
      '.card__image'
    ) as HTMLImageElement;
    const cardTitleElement = this.element.querySelector(
      '.card__title'
    ) as HTMLElement;
    let deleteButton = this.element.querySelector(
      '.card__delete-button'
    ) as HTMLButtonElement | null;

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
