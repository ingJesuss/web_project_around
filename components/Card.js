import { api } from "./Api.js";
import { openPopupConfirmation } from "../scripts/utils.js";
import { popupConfirm } from "../scripts/index.js";

export class Card {
  constructor(data, cardSelector, handleCardClick, isLiked) {
    (this.name = data.name),
      (this.link = data.link),
      (this.description = data.description),
      (this.cardSelector = cardSelector),
      (this.handleCardClick = handleCardClick),
      (this.isLiked = isLiked),
      (this._id = data._id);
  }

  getTemplate() {
    const cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card__container")
      .cloneNode(true);
    return cardElement;
  }

  setEventListener() {
    this.buttonLike.addEventListener("click", () => this.handleLike());
    this.buttonDelete.addEventListener("click", () => {
      openPopupConfirmation();
      popupConfirm.setSubmitAction(() => this.handleDelete());
      popupConfirm.open();
    });

    this.cardImage.addEventListener("click", () => {
      this.handleCardClick(this.link, this.description, this.name);
    });
  }

  handleLike() {
    const isLiked = this.buttonLike.classList.contains("card__btn-like");
    const likeAction = isLiked
      ? api.deleteLikeCard(this._id)
      : api.putLikeCard(this._id);

    likeAction
      .then((data) => {
        if (data.isLiked) {
          this.buttonLike.classList.add("card__btn-like");
        } else {
          this.buttonLike.classList.remove("card__btn-like");
        }
      })
      .catch((err) => {
        console.error("Error al actualizar estado Like", err);
      });
  }

  handleDelete() {
    api
      .deleteCard(this._id)
      .then(() => {
        this.card.remove();
        popupConfirm.close();
      })
      .catch((err) => {
        console.error("Error al eliminar la tarjeta:", err);
      });
  }

  generateCard() {
    this.card = this.getTemplate();
    this.cardTitle = this.card.querySelector(".card__container-title");
    this.cardImage = this.card.querySelector(".card__container-image");
    this.buttonDelete = this.card.querySelector(".card__delete-img");
    this.buttonLike = this.card.querySelector(".card__container-btn");

    this.cardTitle.textContent = this.name;
    this.cardImage.src = this.link;
    this.cardImage.alt = this.description;
    if (this.isLiked) {
      this.buttonLike.classList.add("card__btn-like");
    } else {
      this.buttonLike.classList.remove("card__btn-like");
    }
    this.setEventListener();
    return this.card;
  }
}
