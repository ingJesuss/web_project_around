export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector),
    this.formOverlay = document.querySelector(".form__overlay");
    this.buttonClose = document.querySelector(".form__close-btn");
  }

  open() {
    this.popup.classList.add("open__popup");
    document.addEventListener("keydown", this._handleEscClose);
    
  }

  close() {
    this.popup.classList.remove("open__popup");
    document.removeEventListener("keydown", this._handleEscClose);
    
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this.popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup__close")) {
        this.close();
      }
    });    

    this.formOverlay.addEventListener("click", (e) => {
      if (e.target === this.formOverlay) {
        this.close();
      }
    });

      this.buttonClose.addEventListener("click", () => {
        this.close();
    });
  
  }
}
