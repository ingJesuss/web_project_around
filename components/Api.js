class Api {
  constructor({ url, headers }) {
    (this.url = url), (this.headers = headers);
  }
//metodo para obtener la infromación del Usuario
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error en la conexion, Codigo : " + res.status);
        }
      })
      .then((data) => {
        return data;
      });
  }
  /* metodo para obtener Cards */
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(
            "Error en la conexión, cards no disponibles codigo : " + res.status
          );
        }
      })
      .then((data) => {
        return data;
      });
  }

  /* metodo para editar datos de perfil */
  patchEditProfile({ name, about }) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error en la conexión, codigo : " + res.status);
        }
      })
      .then((data) => {
        return data;
      });
  }
//metodo para generar una nueva Card
  postNewCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error en la conexión, codigo : " + res.status);
        }
      })
      .then((data) => {
       
        return data;
      });
  }

  //metodo para eliminar una Card
  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error en la conexion, codigo : " + res.status);
      }
    });
  }


//metodo para likes
  putLikeCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`,{
      method : "PUT",
      headers : this.headers,
    }).then((res) => {
      if(res.ok){
        return res.json();
      }else{
        throw new Error ("Error al dar like codigo: " + res.status)
      }
    }) 
  }
//metodo para quitar likes
  deleteLikeCard(cardId){
    return fetch(`${this.url}/cards/${cardId}/likes`,{
      method:"DELETE",
      headers:this.headers,
    }).then((res) => {
      if(res.ok){
        return res.json()
      }else{
        throw new Error ("Error al quitar like codigo : " + res.status)
      }
    })
  }

  //metodo para cambiar foto de perfil
updateAvatar({avatar}){
  return fetch(`${this.url}/users/me/avatar`,{
    method :"PATCH",
    headers : this.headers,
    body : JSON.stringify({avatar})
  }).then((res) => {
    if(res.ok){
      return res.json()
    }else{
      throw new Error ("Error al cargar imagen codigo:" + res.status)
    }
  })
  
}
}
    

export const api = new Api({
  url: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "7259e814-6450-4bc7-b2dc-200198b86dce",
    "Content-Type": "application/json",
  },
});
