import type {
  CardData,
  HandleCardClick,
  HandleCardDelete,
  HandleCardLike,
} from '../types/types.js';

export class Card {
  private data: CardData;
  private selector: string;
  private currentUserId: string;
  private handleCardClick: HandleCardClick;
  private handleCardDelete: HandleCardDelete;
  private handleCardLike: HandleCardLike;
  private element!: HTMLElement;
  private cardImageElement!: HTMLImageElement;
  private likeButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    selector: string,
    currentUserId: string,
    handleCardClick: HandleCardClick,
    handleCardDelete: HandleCardDelete,
    handleCardLike: HandleCardLike
  ) {
    this.data = data;
    this.selector = selector;
    this.currentUserId = currentUserId;
    this.handleCardClick = handleCardClick;
    this.handleCardDelete = handleCardDelete;
    this.handleCardLike = handleCardLike;
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

  private updateLikeState(isLiked: boolean): void {
    this.data.isLiked = isLiked;
    this.likeButton.classList.toggle('card__like-button_is-active', isLiked);
  }

  private setEventListeners(deleteButton: HTMLButtonElement | null): void {
    this.likeButton.addEventListener('click', async () => {
      const isNowLiked = await this.handleCardLike(
        this.data._id,
        this.data.isLiked
      );
      this.updateLikeState(isNowLiked);
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
    this.likeButton = this.element.querySelector(
      '.card__like-button'
    ) as HTMLButtonElement;
    let deleteButton = this.element.querySelector(
      '.card__delete-button'
    ) as HTMLButtonElement | null;

    this.cardImageElement.src = this.data.link;
    this.cardImageElement.alt = this.data.name;
    cardTitleElement.textContent = this.data.name;
    this.likeButton.classList.toggle(
      'card__like-button_is-active',
      this.data.isLiked
    );

    if (!this.isOwner()) {
      deleteButton?.remove();
      deleteButton = null;
    }

    this.setEventListeners(deleteButton);

    return this.element;
  }
}
