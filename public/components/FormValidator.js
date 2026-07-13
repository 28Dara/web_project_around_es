export class FormValidator {
    config;
    form;
    inputList;
    submitButton;
    constructor(config, form) {
        this.config = config;
        this.form = form;
        this.inputList = form.querySelectorAll(config.inputSelector);
        this.submitButton = form.querySelector(config.submitButtonSelector);
    }
    hideInputError(input) {
        const errorElement = this.form.querySelector(`#${input.id}-error`);
        input.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this.config.errorClass);
    }
    checkInputValidity(input) {
        const errorElement = this.form.querySelector(`#${input.id}-error`);
        if (!input.validity.valid) {
            input.classList.add(this.config.inputErrorClass);
            errorElement.textContent = input.validationMessage;
            errorElement.classList.add(this.config.errorClass);
        }
        else {
            this.hideInputError(input);
        }
    }
    toggleButtonState() {
        const isFormValid = Array.from(this.inputList).every((input) => input.validity.valid);
        this.submitButton.disabled = !isFormValid;
        this.submitButton.classList.toggle(this.config.inactiveButtonClass, !isFormValid);
    }
    setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this.checkInputValidity(input);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        this.inputList.forEach((input) => {
            this.checkInputValidity(input);
        });
        this.toggleButtonState();
    }
}
