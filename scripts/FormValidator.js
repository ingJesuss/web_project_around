
//config almacena configuración de clases y selectores que se encuentra en index.js
export class FormValidator {
  constructor(data, formElement) {
    this.config = data;
    this.formElement = formElement;
  }

  _showError(inputElement) {
    const errorMessage = inputElement.validationMessage;
    const errorElement = document.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  }

  _hideError(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputInvalid(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }
  _hasInputInvalid(inputList) {
    return inputList.every((inputElement) => inputElement.validity.valid);
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
     this._disabledButton();
    });
  }
  _disabledButton() {
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
