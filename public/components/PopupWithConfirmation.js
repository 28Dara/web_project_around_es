import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
    confirmButton;
    handleConfirm = () => { };
    constructor(popupSelector) {
        super(popupSelector);
        this.confirmButton = this.popupElement.querySelector('.popup__button');
    }
    setSubmitAction(action) {
        this.handleConfirm = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this.confirmButton.addEventListener('click', () => {
            this.handleConfirm();
            this.close();
        });
    }
}
