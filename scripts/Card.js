import {modalCard} from "./utils.js"

export class Card {
  constructor(data, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this.description = data.description;
    this.cardSelector = cardSelector;
  }

  getTemplate() {
    const cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card__container")
      .cloneNode(true);
    return cardElement;
  }

  setEventListener() {
    this.buttonLike.addEventListener("click", () => this.handleLike() );
    this.buttonDelete.addEventListener("click", () =>  this.handleDelete());
    this.cardImage.addEventListener("click" , () =>  this.openModal());
  }

  handleLike() {
    this.buttonLike.classList.toggle("card__btn-like");
  }
  handleDelete() {
    this.card.remove();
  } 

  openModal() {
    modalCard(this.name, this.link, this.description);
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
    
    this.setEventListener();

    return this.card;
  }
 

}

