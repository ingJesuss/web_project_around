//config almacena configuración de clases y selectores que se encuentra en index.js mientras que formElement es el formulario que se va a validar.

export class FormValidator {
  constructor(data, formElement) {
    this.config = data;
    this.formElement = formElement;
  }

  /* metodo que muestra el elemento erroneo y notifica al usuario */
  _showError(inputElement) {
    const errorMessage = inputElement.validationMessage;
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  }

  //metodo que oculta el mensaje de error cuando cumple con los parametros establecidos
  _hideError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = "";
  }
  //metodo condicional que verifica si los elementos input sean validos para mostrar u ocultar el mensaje.
  _checkInputInvalid(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  _hasInputInvalid(inputList) {
    const serchTitle = document.querySelector(".form__title").textContent;

    if (serchTitle === "Cambiar foto de perfil") {
      return inputList.some((inputElement) => inputElement.validity.valid);
    } else {
      return inputList.every((inputElement) => inputElement.validity.valid);
    }
  }

  _toggleButtonState(inputList) {
    const buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector
    );
    if (this._hasInputInvalid(inputList)) {
      buttonElement.classList.remove(this.config.inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this.config.inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

  _setEventListener() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector)
    );

    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(inputList);
        this._checkInputInvalid(inputElement);
      });
    });

    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
  //sea hace el metodo publico para poder usar en submit en UTILS
  disabledButton() {
    const buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector
    );

    buttonElement.classList.add(this.config.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  enableValidation() {
    this._setEventListener();
  }
}
