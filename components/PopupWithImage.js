import { Popup } from "./Popup.js";


//clase hija de popup 
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.modalCard = document.querySelector(".modal__card");
    this.modalImage = document.createElement("img");
    this.modalTitle = document.querySelector(".modal__title");
    this.modalBtnClose = document.querySelector(".modal__button-close");
    this.modalOverlay = document.querySelector(".modal__overlay");
    this.modalContainer = document.querySelector(".modal");
  }

  //muestra la Card en el modal overlay
  open(link, description, title) {
    super.open();
    this.modalImage.src = link;
    this.modalImage.alt = description;
    this.modalTitle.textContent = title;
    this.modalImage.classList.add("modal__card-image");
    this.modalCard.prepend(this.modalImage);    
  } 
  
  close() {
    super.close();
    this.modalImage.remove();
  } 

  /* Para que la pantalla suba automaticamente cuando se abra el modal */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  setEventListeners() {
    

    this.modalBtnClose.addEventListener("click", () => {
      this.modalContainer.classList.remove("open__popup");
      this.modalImage.remove();
    });

    this.modalOverlay.addEventListener("click", (e) => {
      if (e.target === this.modalOverlay) {
        this.close();
      }
    });
  }
}
