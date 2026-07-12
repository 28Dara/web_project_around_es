export class Popup {
    popupSelector;
    popupElement;
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.popupElement = document.querySelector(popupSelector);
    }
    handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close(shouldClearForm = true) {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
        closeButton.addEventListener("click", () => {
            this.close();
        });
        this.popupElement.addEventListener("click", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close(false);
            }
        });
    }
}
