const openPopupBtn = document.querySelector(".profile__btn");
const form = document.querySelector(".form");
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const closePopupBtn = document.querySelector(".form__close-btn");


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