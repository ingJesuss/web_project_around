const openPopupBtn = document.querySelector(".profile__btn");
const form = document.querySelector(".form");
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const closePopupBtn = document.querySelector(".form__close-btn");
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


initialCards.forEach(card => {
  const cardTemplate = document.querySelector("#card__template").content;
  const cardElement = cardTemplate
    .querySelector(".card__container")
    .cloneNode(true);
  cardElement.querySelector(".card__container-image").src = card.link;
  cardElement.querySelector(".card__container-image").alt = card.description;
  cardElement.querySelector(".card__container-title").textContent = card.name;

  cardContainer.appendChild(cardElement);
});

/* funcion que activara/desactivara una clase para qu muestre el popup */
function toggleElement() {
  form.classList.toggle("open__popup");
}

/* función que abre la ventana emergente (formulario) trayendo el valor de los inputs desde el objeto correspondiente*/
function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  toggleElement();
}

/* btn close  revisar para que solo cierre.*/
function closePopup() {
  toggleElement();
}

/* function para actualizar la información de popup se crean 2 variables para almacenar el valor y se muestra en el elemento correspondiente */
function submitForm(e) {
  e.preventDefault();
  let newTitle = nameInput.value;
  let newJob = jobInput.value;
  profileName.innerText = newTitle;
  profileJob.innerText = newJob;
  toggleElement();
}

openPopupBtn.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopup);
form.addEventListener("submit", submitForm);
