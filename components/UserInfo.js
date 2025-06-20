// Clase para manejar la información del usuario, esta clase se enlaza a los elementos del DOM que contienen la información del usuario.

export class UserInfo {
  constructor({ nameSelector, jobSelector, imgSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
    this.img = document.querySelector(imgSelector);
  }

  // Método para establecer la información del usuario, usamos el metodo dentro de la funcion openPopupProfile
  // para que se muestre la información del usuario en el formulario de perfil.
  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
    };
  }
  // Método para actualizar la información del usuario, usamos el metodo en la funcion editFormProfile
  setUserInfo({ name, job, img }) {
    this.name.textContent = name;
    this.job.textContent = job;
    if (img) {
      this.img.src = img;
    }
  }
}
