

export class Card {
  constructor(data, cardSelector,handleCardClick) {
    this.name = data.name;
    this.link = data.link;
    this.description = data.description;
    this.cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    this.cardImage.addEventListener("click", () => {
    this.handleCardClick(this.link, this.description, this.name);
    });
  }

  handleLike() {
    this.buttonLike.classList.toggle("card__btn-like");
  }
  
  handleDelete() {
    this.card.remove();
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

