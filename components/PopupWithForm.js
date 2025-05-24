
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector,handleFormSubmit) {
        super(popupSelector),
        this.handleFormSubmit=handleFormSubmit,      
        this.form = this.popup.querySelector(".form__popup");       
        
}

 _getInputValues() {
    const inputList = this.form.querySelectorAll(".form__input");
    const inputValues = {};
    inputList.forEach((input) => {
    inputValues[input.name] = input.value;
});
console.log(inputValues);
    return inputValues;
} 
open() {
    super.open();    
}

close() {
   super.close();   
   this.form.reset();
   
}

 setEventListeners(){
    super.setEventListeners(); 
    this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit(this._getInputValues);
       
    });
  
    
} 

}