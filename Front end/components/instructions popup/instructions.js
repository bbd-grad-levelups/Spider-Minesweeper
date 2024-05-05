import { getHTML } from "../../util/common.js";

class instructionPopup extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        getHTML('components/instructions popup/instructions.html').then(html =>{
            this.innerHTML=html;
        }).catch(error =>console.error(error));
        
    }
}

customElements.define("instructions-popup",instructionPopup)
export default instructionPopup;

