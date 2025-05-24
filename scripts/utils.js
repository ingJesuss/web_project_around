import { PopupWithImage } from "../components/PopupWithImage.js";
import { Card } from "../components/Card.js";
import { popupWithForm, infoUser } from "./index.js";

export const openPopupBtn = document.querySelector(".profile__btn");
export const btnChangeImage = document.querySelector(".profile__btn-add");
/* selectores para form */
export const formPopup = document.querySelector(".form__popup");
const form = document.querySelector(".form");
const jobInput = document.querySelector("#jobInput");
const nameInput = document.querySelector("#nameInput");
const formButton = document.querySelector(".form__submit-btn");
const formTitle = document.querySelector(".form__title");
const cardContainer = document.querySelector(".card__containers");

//objeto que se utiliza en FormValidator.js para la validación de el formulario.
export const config = {
  //Selector
  formSelector: ".form__popup",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  //CLASES
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__error_visible",
};

/* array de objetos de imagenes con su titulo y descripción*/
export const initialCards = [
  {
    name: "Edersee, Alemania",
    link: "./images/edersse.jpg",
    description: "Edersee,Alemania un arbol con fondo de estrellas",
  },
  {
    name: "McWay Falls",
    link: "./images/isla.jpg",
    description: "imagen de una isla con el mar color turquesa",
  },
  {
    name: "Cima d'Asta Italia",
    link: "./images/stairs.jpg",
    description:
      "imagen de estrellas con lo que parece un meteorito en Italia.",
  },
  {
    name: "Cabo San Lucas,Baja California",
    link: "./images/cabos.jpg",
    description:
      "Arco de Cabo San Lucas, imponente y majestuosa formación rocosa, un arco natural en la punta misma del extremo austral de la península de Baja California, en Baja California Sur en México.",
  },
  {
    name: "Rio de Janeiro,Brasil",
    link: "./images/brasil.jpg",
    description: "imagen en las alturas de brazil",
  },
  {
    name: "Islandia",
    link: "./images/islandia.jpg",
    description: "Imagen de glaciales en islandia",
  },
];

export function handleCardClick(link, description, title) {
  const popupWithImage = new PopupWithImage(".modal");
  popupWithImage.open(link, description, title);
  popupWithImage.scrollToTop();
  popupWithImage.setEventListeners();
}

/* funcion que agrega nueva carta contine logica de modal card  tomamos los valores que el usuario ingresa en el formulario.*/
function addNewCard() {
  const formDate = {
    name: nameInput.value,
    link: jobInput.value,
    description: nameInput.value,
  };

  //creacion de instancia
  const newCard = new Card(formDate, "#card__template", handleCardClick);
  const cardElement = newCard.generateCard();
  /* mostrar card */
  cardContainer.prepend(cardElement);
}

/* Funcion para abrir el pop de nueva imagen */
export function openPopupNewImage() {
  const error = form.querySelectorAll(".form__input-error");
  error.forEach((error) => {
    error.textContent = "";
    error.classList.remove("form__error_visible");
  });

  formTitle.innerText = "Nuevo Lugar";
  nameInput.value = "";
  nameInput.placeholder = "Titulo";
  nameInput.minLength = 2;
  nameInput.maxLength = 30;

  jobInput.value = "";
  jobInput.placeholder = "Enlace de la imagen";
  jobInput.type = "url";
  formButton.textContent = "Crear";

  popupWithForm.open();
}

/* función que abre la ventana emergente (formulario) trayendo el valor de los inputs desde el objeto correspondiente*/
export function openPopupProfile() {
  const error = form.querySelectorAll(".form__input-error");
  error.forEach((error) => {
    error.textContent = "";
    error.classList.remove("form__error_visible");
  });
  /* obtenemos el valor de los inputs desde el objeto correspondiente*/
  const renderInfo = infoUser.getUserInfo();
  const { name, job } = renderInfo;

  nameInput.value = name;
  formTitle.innerText = "Editar Perfil";
  form.classList.add("perfil");
  nameInput.placeholder = "Nombre";
  nameInput.minLength = 2;
  nameInput.maxLength = 40;

  jobInput.value = job;
  jobInput.placeholder = "Acerca de mi";
  jobInput.type = "text";
  jobInput.minLength = 2;
  jobInput.maxLength = 200;
  formButton.textContent = "Guardar";

  popupWithForm.open();
}

// funcion que se encarga de editar el perfil, donde se toman los valores de los inputs y se asignan a la instancia de UserInfo.
function editFormProfile() {
  const newInfo = {
    name: nameInput.value,
    job: jobInput.value,
  };
  infoUser.setUserInfo(newInfo);
}

/* funcion que se encarga de enviar el formulario, dependiendo del valor del titulo 
del formulario se ejecutara una u otra condición. */
export function submitForm() {
  const serchTitle = form.querySelector(".form__title").textContent;
  if (serchTitle === "Editar Perfil") {
    editFormProfile();
  }
  if (serchTitle === "Nuevo Lugar") {
    addNewCard();
  }

  formPopup.reset();
  popupWithForm.close();
}
