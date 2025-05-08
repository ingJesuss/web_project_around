/* import { enableValidation } from "./FormValidator.js";  */
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js"; 


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


/* Iteramos por c/u de los objetos del array initialCards y clonamos */
function cards() {
  initialCards.forEach((card) => {
    const cardElement = new Card(card,"#card__template");
    const createCard = cardElement.generateCard();    
    cardContainer.appendChild(createCard);
  });
}
cards();


/* funcion que agrega nueva carta contine logica de modal card  tomamos los valores que el usuario ingresa en el formulario.*/
export function addNewCard() {
  const formDate = {
    name : nameInput.value,
    link : jobInput.value,
    description: nameInput.value,
  }
//creacion de instancia
  const newCard = new Card(formDate, "#card__template");
  const cardElement = newCard.generateCard();
  /* mostrar card */
  cardContainer.prepend(cardElement);
}

/* funcion que activara/desactivara una clase para qu muestre el popup */
function toggleElement() {
  form.classList.toggle("open__popup");
}

/* btn close popup.*/
export function closePopup() {
    toggleElement();    
}


// función para cerrar Popup haciendo click fuera de el fromulario o con ESC
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
  const error= form.querySelectorAll(".form__input-error");
  error.forEach((error) => { 
    error.textContent="";
    error.classList.remove("form__error_visible");
  });

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
  const error= form.querySelectorAll(".form__input-error");
  error.forEach((error) => { 
    error.textContent="";
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

  toggleElement();
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

formPopup.addEventListener("submit" , (e) => {
  e.preventDefault();
  submitForm();
});
 

popupOverlay();
openPopupBtn.addEventListener("click", openPopupProfile);
btnChangeImage.addEventListener("click", openPopupNewImage);
closePopupBtn.addEventListener("click", closePopup);

const config = {
  //Selector
  formSelector: ".form__popup",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  //CLASES
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__error_visible",
};

const formValidator = new FormValidator(config,formPopup);
formValidator.enableValidation();
