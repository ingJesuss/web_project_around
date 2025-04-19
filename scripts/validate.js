//función que muestra el error en el elemento

import { submitForm } from "./index.js";

const showError = (inputElement, config) => {
  const errorMessage = inputElement.validationMessage;
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideError = (inputElement, config) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputInvalid = (inputElement, config) => {
  if (inputElement.validity.valid) {
    hideError(inputElement, config);    
  } else {
    showError(inputElement, config);
  }
};

/* const hasInputInvalid = (inputList) => {
  return btnh;
}; */

const toggleButtonState = (inputList,buttonElement,config) => {
  const btnh =  inputList.every((inputElement) => inputElement.validity.valid);  
    console.log(btnh);
  if (btnh) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled=false;
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);    
    buttonElement.disabled=true;   
  }
}

//función para controlar los input
const setEventListener = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputInvalid(inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });  
  formElement.addEventListener("submit" , (e) => {  
    e.preventDefault();
    submitForm();
    formElement.reset();

  });
};


export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListener(form, config);

  });
};
