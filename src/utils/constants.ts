import type { FormValidatorConfig } from '../types/types.js';
import type { CardData } from '../types/types.js';
import type { ApiConfig } from '../types/types.js';

export const defaultFormConfig: FormValidatorConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const apiConfig: ApiConfig = {
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'c0ddf0cf-88d1-48e6-85fb-4d797dfcd802',
    'Content-Type': 'application/json',
  },
};
