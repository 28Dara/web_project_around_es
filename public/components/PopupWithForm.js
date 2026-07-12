import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    formElement;
    inputList;
    handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.formElement = this.popupElement.querySelector(".popup__form");
        this.inputList = this.formElement.querySelectorAll("input");
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
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
            this.close();
        });
    }
    close(shouldClearForm = true) {
        if (shouldClearForm) {
            this.formElement.reset();
        }
        super.close(shouldClearForm);
    }
}
