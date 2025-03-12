let openPopupBtn = document.querySelector(".profile__btn");
let form = document.querySelector(".form__profile");
let nameInput = document.querySelector("#nameInput");
let jobInput = document.querySelector("#jobInput");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let closePopupBtn = document.querySelector(".form__close-btn");


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

/* btn close */
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