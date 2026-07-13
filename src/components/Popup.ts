export class Popup {
  protected popupSelector: string;
  protected popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this.popupSelector = popupSelector;
    this.popupElement = document.querySelector(
      this.popupSelector
    ) as HTMLElement;
  }

  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  open(): void {
    this.popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', this.handleEscClose);
  }

  close(shouldClearForm: boolean = true): void {
    this.popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this.handleEscClose);
  }

  setEventListeners(): void {
    const closeButton = this.popupElement.querySelector(
      '.popup__close'
    ) as HTMLButtonElement;

    closeButton.addEventListener('click', () => {
      this.close();
    });

    this.popupElement.addEventListener('click', (evt: MouseEvent) => {
      if (evt.target === evt.currentTarget) {
        // Decisión de UX: se conserva el contenido del formulario al cerrar
        // haciendo clic afuera (a diferencia de la "X"), para no perder
        // datos si el usuario sale por accidente.
        this.close(false);
      }
    });
  }
}
