# Tripleten web_project_around
Tecnologias utilizadas
1.- html
2.-Css
3.-Java Script

Pagina interactiva donde los usuarios podran añadir, eliminar o dar me gusta a las imagenes

link de GitHub
https://ingjesuss.github.io/web_project_around/





const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideError = (formElement, inputElement) => {
  inputElement.classList.remove("form__input-error");
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (/* formInput */ !inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__button_disabled");
  } else {
    buttonElement.classList.remove("form__button_disable");
  }
};

//detector de eventos para todos los input
const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));

  toggleButtonState(inputList,formButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, formInput);
      toggleButtonState(inputList,formButton);
    });
  });
};

//agregar controlador a todos los formularios

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault;
    });
    setEventListener(formElement);
  });
};
enableValidation();

