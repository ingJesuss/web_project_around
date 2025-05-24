import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {} from "./utils.js";
import {
  config,
  handleCardClick,
  initialCards, 
  openPopupBtn,
  submitForm,  
  openPopupNewImage,
  openPopupProfile,
  btnChangeImage,
  formPopup,
} from "./utils.js";


//renderizacion de card por medio de Section
const rendererCard = new Section(
  {
    data: initialCards,
    renderer: (card) => {
      const cardElement = new Card(card, "#card__template",handleCardClick);
      const createCard = cardElement.generateCard();
      rendererCard.addItem(createCard);
    },
  },
  ".card__containers"
);

rendererCard.renderItems();



//instancia de la clase UserInfo, donde se le pasan los selectores de los elementos que se van a modificar.
export const infoUser = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});


//instancia de la clase PopupWithForm, donde se le pasan los selectores de los elementos que se van a modificar.
export const popupWithForm = new PopupWithForm(".form", submitForm);
popupWithForm.setEventListeners();


openPopupBtn.addEventListener("click", openPopupProfile);
btnChangeImage.addEventListener("click", openPopupNewImage);

/*nueva instancia de formulario declaramos y asignamos un valor a la variable, donde pasamos la nueva instancia importada de FormValidator y como parametro pasamos config, que es la propiedad this.config=data y el segundo argumento es el nombre del formulario. 
Despues llamamos al método enableValidation() en la instancia formvalidator*/
const formValidator = new FormValidator(config, formPopup);
formValidator.enableValidation();
