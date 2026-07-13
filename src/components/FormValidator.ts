import type { FormValidatorConfig } from '../types/types.js';

export class FormValidator {
  private config: FormValidatorConfig;
  private form: HTMLFormElement;
  private inputList: NodeListOf<HTMLInputElement>;
  private submitButton: HTMLButtonElement;

  constructor(config: FormValidatorConfig, form: HTMLFormElement) {
    this.config = config;
    this.form = form;
    this.inputList = form.querySelectorAll(config.inputSelector);
    this.submitButton = form.querySelector(
      config.submitButtonSelector
    ) as HTMLButtonElement;
  }

  private hideInputError(input: HTMLInputElement): void {
    const errorElement = this.form.querySelector(
      `#${input.id}-error`
    ) as HTMLElement;

    input.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.config.errorClass);
  }

  private checkInputValidity(input: HTMLInputElement): void {
    const errorElement = this.form.querySelector(
      `#${input.id}-error`
    ) as HTMLElement;

    if (!input.validity.valid) {
      input.classList.add(this.config.inputErrorClass);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(this.config.errorClass);
    } else {
      this.hideInputError(input);
    }
  }

  private toggleButtonState(): void {
    const isFormValid = Array.from(this.inputList).every(
      (input) => input.validity.valid
    );
    this.submitButton.disabled = !isFormValid;
    this.submitButton.classList.toggle(
      this.config.inactiveButtonClass,
      !isFormValid
    );
  }

  private setEventListeners(): void {
    this.toggleButtonState();

    this.inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this.checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  enableValidation(): void {
    this.setEventListeners();
  }

  resetValidation(): void {
    this.inputList.forEach((input) => {
      this.checkInputValidity(input);
    });
    this.toggleButtonState();
  }
}
