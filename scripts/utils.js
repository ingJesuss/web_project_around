
//funcion que abre y muestra el modal de la image al hacer click sobre ella
export function modalCard(title, link, description) {
    const modalContainer = document.querySelector(".modal");
   modalContainer.classList.add("modal__open");
    const modalImage = document.querySelector(".modal__card-image");
    const modalTitle = document.querySelector(".modal__title");
    const modalBtnClose = document.querySelector(".modal__button-close");
    const modalOverlay = document.querySelector(".modal__overlay")
    modalImage.src = link;
    modalImage.alt = description;
    modalTitle.innerHTML = title;
  
    /* Para que la pantalla suba automaticamente cuando se abra el modal */
    window.scrollTo({ top: 0, behavior: "smooth" });
  
    modalBtnClose.addEventListener("click", () => {
      modalContainer.classList.remove("modal__open");
    }); 
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalContainer.classList.remove("modal__open");
      }
    }); 
    document.addEventListener("keydown", (e) => {
     if (e.key === "Escape") {
      modalContainer.classList.remove("modal__open");
     }
    });
  }
  
