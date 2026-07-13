export class Popup {
    popupSelector;
    popupElement;
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.popupElement = document.querySelector(this.popupSelector);
    }
    handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };
    open() {
        this.popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', this.handleEscClose);
    }
    close(shouldClearForm = true) {
        this.popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this.handleEscClose);
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector('.popup__close');
        closeButton.addEventListener('click', () => {
            this.close();
        });
        this.popupElement.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                // Decisión de UX: se conserva el contenido del formulario al cerrar
                // haciendo clic afuera (a diferencia de la "X"), para no perder
                // datos si el usuario sale por accidente.
                this.close(false);
            }
        });
    }
}
