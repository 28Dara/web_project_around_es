import { Popup } from './Popup.js';
import type { FormValues, HandleFormSubmitFunction } from '../types/types.js';

export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: NodeListOf<HTMLInputElement>;
  private handleFormSubmit: HandleFormSubmitFunction;

  constructor(
    popupSelector: string,
    handleFormSubmit: HandleFormSubmitFunction
  ) {
    super(popupSelector);
    this.handleFormSubmit = handleFormSubmit;
    this.formElement = this.popupElement.querySelector(
      '.popup__form'
    ) as HTMLFormElement;
    this.inputList = this.formElement.querySelectorAll('input');
  }

  private getInputValues(): FormValues {
    const values: FormValues = {};
    this.inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners(): void {
    super.setEventListeners();
    this.formElement.addEventListener('submit', (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
  }

  close(shouldClearForm: boolean = true): void {
    if (shouldClearForm) {
      this.formElement.reset();
    }
    super.close(shouldClearForm);
  }
}
