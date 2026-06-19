const toValidate = {
  forms: ".popup__form",
  inputs: ".popup__input",
  submitButton: ".popup__button",
};

function checkInputValidity(input, form) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    errorElement.textContent = input.validationMessage;
  } else {
    errorElement.textContent = "";
  }
}

function toggleButtonState(form) {
  const allValid = Array.from(form.querySelectorAll(toValidate.inputs)).every(
    (input) => input.validity.valid,
  );

  const submitButton = form.querySelector(toValidate.submitButton);

  submitButton.disabled = !allValid;
}

function setEventListeners() {
  const forms = document.querySelectorAll(toValidate.forms);
  forms.forEach((form) => {
    toggleButtonState(form);
    form.querySelectorAll(toValidate.inputs).forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, form);
        toggleButtonState(form);
      });
    });
  });
}

function resetValidation(form) {
  form.querySelectorAll(toValidate.inputs).forEach((input) => {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
  });
  toggleButtonState(form);
}

export { setEventListeners, toggleButtonState, resetValidation };
