import { enableValidation } from "./validate.js";

const openPopupBtn = document.querySelector(".profile__btn");
const closePopupBtn = document.querySelector(".form__close-btn");
const btnChangeImage = document.querySelector(".profile__btn-add");
/* selectores para form */
const form = document.querySelector(".form");
const formPopup = document.querySelector(".form__popup");
const jobInput = document.querySelector("#jobInput");
const nameInput = document.querySelector("#nameInput");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const formButton = document.querySelector(".form__submit-btn");
const formTitle = document.querySelector(".form__title");
const formOverlay = document.querySelector(".form__overlay");
/* Selectores para template */
const cardContainer = document.querySelector(".card__containers");
const cardTemplate = document.querySelector("#card__template").content;

/* array de objetos de imagenes con su titulo y descripción */
const initialCards = [
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

function popupCard(title, link, description) {
  const modalContainer = document.querySelector(".modal");
  modalContainer.classList.add("modal__open");
  const modalImage = document.querySelector(".modal__card-image");
  const modalTitle = document.querySelector(".modal__title");
  const modalBtnClose = document.querySelector(".modal__button-close");
  modalImage.src = link;
  modalImage.alt = description;
  modalTitle.innerHTML = title;

  /* Para que la pantalla suba automaticamente cuando se abra el modal */
  window.scrollTo({ top: 0, behavior: "smooth" });

  modalBtnClose.addEventListener("click", () => {
    modalContainer.classList.remove("modal__open");
  });
}

/* Iteramos por c/u de los objetos del array y clonamos */
function cards() {
  initialCards.forEach((card) => {
    const cardElement = cardTemplate
      .querySelector(".card__container")
      .cloneNode(true);

    const imageElement = cardElement.querySelector(".card__container-image");
    imageElement.src = card.link;
    imageElement.alt = card.description;
    cardElement.querySelector(".card__container-title").textContent = card.name;

    /* mostrar card */
    imageElement.addEventListener("click", () =>
      popupCard(card.name, card.link, card.description)
    );
    cardContainer.appendChild(cardElement);
  });
}
cards();

/* delegación de eventos like y delete del contenedtor card */
function handlerButtonsCard() {
  cardContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("card__container-btn")) {
      e.target.classList.toggle("card__btn-like");
    }

    if (e.target.classList.contains("card__delete-img")) {
      e.target.closest(".card__container").remove();
    }
  });
}

/* funcion que activara/desactivara una clase para qu muestre el popup */
function toggleElement() {
  form.classList.toggle("open__popup");
}

/* btn close popup.*/
function closePopup() {
  toggleElement();
}

// función para cerrar Popup haciendo click fuera de el fromulario
const popupOverlay = () => {
  formOverlay.addEventListener("click", (e) => {
    if (e.target === formOverlay) {
      closePopup();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const popupAbierto = document.querySelector(".open__popup");
      if (popupAbierto) {
        closePopup();
      }
    }
  });
 
};

/* función que abre la ventana emergente (formulario) trayendo el valor de los inputs desde el objeto correspondiente*/

function openPopupProfile() {
  formTitle.innerText = "Editar Perfil";
  form.classList.add("perfil");
  nameInput.value = profileName.textContent;
  nameInput.placeholder = "Nombre";
  nameInput.minLength = 2;
  nameInput.maxLength = 40;

  jobInput.value = profileJob.textContent;
  jobInput.placeholder = "Acerca de mi";
  jobInput.type = "text";
  jobInput.minLength = 2;
  jobInput.maxLength = 200;
  formButton.textContent = "Guardar";
  

  toggleElement();
}

/* Funcion para abrir el pop de nueva imagen */
function openPopupNewImage() {
  formTitle.innerText = "Nuevo Lugar";
  nameInput.value = "";
  nameInput.placeholder = "Titulo";
  nameInput.minLength = 2;
  nameInput.maxLength = 30;

  jobInput.value = "";
  jobInput.placeholder = "Enlace de la imagen";
  jobInput.type = "url";
  formButton.textContent = "Crear";

  toggleElement();
}

/* funcion para formulario de nueva card */
function addNewCard() {
  const cardElement = cardTemplate
    .querySelector(".card__container")
    .cloneNode(true);
  const imageElement = cardElement.querySelector(".card__container-image");
  const titleElement = cardElement.querySelector(".card__container-title");

  imageElement.src = jobInput.value;
  imageElement.alt = nameInput.value;
  titleElement.textContent = nameInput.value;

  imageElement.addEventListener("click", () => {
    popupCard(titleElement.textContent, imageElement.src, imageElement.alt);
  });

  /* mostrar card */
  cardContainer.prepend(cardElement);
}

/* funcion para formulario edita perfil */
function editFormProfile() {
  let newTitle = nameInput.value.trim();
  let newJob = jobInput.value.trim();
  profileName.innerText = newTitle;
  profileJob.innerText = newJob;
}

/* function que compara el titulo del formulario para abrir el adecuado  */
export function submitForm() {
 

  const serchTitle = form.querySelector(".form__title").textContent;
  if (serchTitle === "Editar Perfil") {
    editFormProfile();
  }
  if (serchTitle === "Nuevo Lugar") {
    addNewCard();
  }
  
  formPopup.reset();  
  closePopup();
}

handlerButtonsCard();
popupOverlay();
openPopupBtn.addEventListener("click", openPopupProfile);
btnChangeImage.addEventListener("click", openPopupNewImage);
closePopupBtn.addEventListener("click", closePopup);
/* form.addEventListener("submit", submitForm); */

enableValidation({
  //Selector
  formSelector: ".form__popup",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  //CLASES
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__error_visible",
});
