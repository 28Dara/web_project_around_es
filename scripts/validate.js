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

function enableValidation() {
  const forms = document.querySelectorAll(toValidate.forms);
  forms.forEach((form) => {
    form.querySelectorAll(toValidate.inputs).forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, form);
        toggleButtonState(form);
      });
    });
  });
}

export { enableValidation };
