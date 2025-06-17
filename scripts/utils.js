import { PopupWithImage } from "../components/PopupWithImage.js";
import { Card } from "../components/Card.js";
import { popupWithForm, infoUser } from "./index.js";
import { formValidator } from "./index.js";
import { api } from "../components/Api.js";

export const openPopupBtn = document.querySelector(".profile__btn");
export const btnChangeImage = document.querySelector(".profile__btn-add");
export const popupProfileImageButton = document.querySelector(
  ".profile__edit-button"
);

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
  /* titleSerch: ".form__title", */
  //CLASES
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__error_visible",
};

export function handleCardClick(link, description, title) {
  const popupWithImage = new PopupWithImage(".modal");
  popupWithImage.open(link, description, title);
  popupWithImage.scrollToTop();
  popupWithImage.setEventListeners();
}

/* funcion que agrega nueva carta contine logica de modal card  tomamos los valores que el usuario ingresa en el formulario.*/
function addNewCard() {
  //variable para los valores de inputs para el backend
  const newCardPost = {
    name: nameInput.value,
    link: jobInput.value,
  };

  //INSTANCIA de API para la creacion de una nueva tarjeta backend
  api
    .postNewCard(newCardPost)
    .then((cardData) => {
      // Crea la tarjeta real con los datos correctos
      const newCard = new Card(
        cardData,
        "#card__template",
        handleCardClick,
        cardData.isLiked
      );
      const CardElement = newCard.generateCard();
      cardContainer.prepend(CardElement);
    })
    .catch((err) => {
      console.error("Error al crear la tarjeta:", err);
    });
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
  nameInput.style.display = "block";

  jobInput.value = "";
  jobInput.placeholder = "Enlace de la imagen";
  jobInput.type = "url";
  formButton.textContent = "Crear";
  formValidator.disabledButton();
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
  nameInput.style.display = "block";

  jobInput.value = job;
  jobInput.placeholder = "Acerca de mi";
  jobInput.type = "text";
  jobInput.minLength = 2;
  jobInput.maxLength = 200;
  formButton.textContent = "Guardar";
  formValidator.disabledButton();

  popupWithForm.open();
}
// funcion que se encarga de editar el perfil, donde se toman los valores de los inputs y se asignan a la instancia de UserInfo.

function editFormProfile() {
  const newInfo = {
    name: nameInput.value,
    job: jobInput.value,
  };

  const editInfo = {
    name: nameInput.value,
    about: jobInput.value,
  };

  /* metodo para editar perfil */
  api.patchEditProfile(editInfo);

  infoUser.setUserInfo(newInfo);
}

//funcion para generar el popup de editar imagen
export function openPopupEditImage() {
  formTitle.innerText = "Cambiar foto de perfil";
  jobInput.type = "url";
  jobInput.placeholder = "Enlace de la imagen";
  jobInput.value = ""; // Limpia solo el input de imagen
  formButton.textContent = "Guardar";

  // Oculta el input de nombre si es necesario
  nameInput.value = "";
  nameInput.placeholder = "";
  nameInput.style.display = "none"; // Oculta el input de nombre

  jobInput.style.display = "block"; // Asegura que el input de imagen esté visible
  formValidator.disabledButton();
  popupWithForm.open();
}

function updateProfileImage() {
  const avatarLink = jobInput.value;

  api
    .updateAvatar({ avatar: avatarLink })
    .then((data) => {
      const currentInfo = infoUser.getUserInfo();
      infoUser.setUserInfo({
        name: currentInfo.name,
        job: currentInfo.job,
        img: data.avatar,
      });
    })
    .catch((err) => {
      console.error("Error al actualizar avatar", err);
    });
}

export function openPopupConfirmation() {
  formTitle.innerText = "¿Estás seguro?";
  formButton.textContent = "Eliminar";
  formButton.classList.remove("form__button_disabled");
  formButton.disabled = false;
  nameInput.style.display = "none";
  jobInput.style.display = "none";
  
}

/* funcion que se encarga de enviar el formulario, dependiendo del valor del titulo 
del formulario se ejecutara una u otra condición. */
export function submitForm() {
  const originalText = formButton.textContent;
  formButton.textContent = "Guardando...";

  const serchTitle = form.querySelector(".form__title").textContent;
  if (serchTitle === "Editar Perfil") {
    editFormProfile();
  }
  if (serchTitle === "Nuevo Lugar") {
    addNewCard();
  }
  if (serchTitle === "Cambiar foto de perfil") {
    updateProfileImage();
  }
 

  //retrasamos la ejecuacion de submit
  setTimeout(() => {
    formButton.textContent = originalText;
    popupWithForm.close();
    formPopup.reset();
    nameInput.style.display = "block";
    jobInput.style.display = "block";
  }, 1500);
}
