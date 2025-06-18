import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { api } from "../components/Api.js";
import {
  config,
  handleCardClick,
  openPopupBtn,
  submitForm,
  openPopupNewImage,
  openPopupProfile,
  openPopupEditImage,
  popupProfileImageButton,
  btnChangeImage,
  formPopup,
} from "./utils.js";

export const popupConfirm = new PopupWithConfirmation(".form");
popupConfirm.setEventListeners();

/* llamado de metodo, usando la instancia de api que se encuentra en la clase Api.js que trae los  datos de Usuario */
api.getUserInfo().then((data) => {
  const dataUser = {
    name: data.name,
    job: data.about,
    img: data.avatar,
  };

  infoUser.setUserInfo(dataUser);
});

/* metodo para traer las cards  */
api.getInitialCards().then((initialCards) => {
  //renderizacion de card por medio de Section
  const rendererCard = new Section(
    {
      data: initialCards,
      renderer: (card) => {
        const cardElement = new Card(
          card,
          "#card__template",
          handleCardClick,
          card.isLiked
        );
        const createCard = cardElement.generateCard();
        rendererCard.addItem(createCard);
      },
    },
    ".card__containers"
  );

  rendererCard.renderItems();
});

//instancia de la clase UserInfo, donde se le pasan los selectores de los elementos que se van a modificar.
export const infoUser = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  imgSelector: ".profile__image",
});

//instancia de la clase PopupWithForm, donde se le pasan los selectores de los elementos que se van a modificar.
export const popupWithForm = new PopupWithForm(".form", submitForm);
popupWithForm.setEventListeners();

openPopupBtn.addEventListener("click", openPopupProfile);
btnChangeImage.addEventListener("click", openPopupNewImage);
popupProfileImageButton.addEventListener("click", openPopupEditImage);

/*nueva instancia de formulario declaramos y asignamos un valor a la variable, donde pasamos la nueva instancia importada de FormValidator y como parametro pasamos config, que es la propiedad this.config=data y el segundo argumento es el nombre del formulario. 
2.-Despues llamamos al método enableValidation() en la instancia formvalidator
3.-se exporta a UTILS para poder usarse con el metodo disableddButon*/
export const formValidator = new FormValidator(config, formPopup);
formValidator.enableValidation();
