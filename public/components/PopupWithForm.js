import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    formElement;
    inputList;
    submitButton;
    defaultButtonText;
    handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.formElement = this.popupElement.querySelector('.popup__form');
        this.inputList = this.formElement.querySelectorAll('input');
        this.submitButton = this.formElement.querySelector('.popup__button');
        this.defaultButtonText = this.submitButton.textContent || '';
    }
    renderLoading(isLoading, loadingText = 'Guardando...') {
        this.submitButton.textContent = isLoading
            ? loadingText
            : this.defaultButtonText;
    }
    getInputValues() {
        const values = {};
        this.inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close(shouldClearForm = true) {
        if (shouldClearForm) {
            this.formElement.reset();
        }
        super.close(shouldClearForm);
    }
}
