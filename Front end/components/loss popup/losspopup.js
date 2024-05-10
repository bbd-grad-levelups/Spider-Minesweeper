import { getHTML } from "../../util/common.js";

class losspopup extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        getHTML('components/loss popup/losspopup.html').then(html =>{
            this.innerHTML=html;
        }).catch(error =>console.error(error));
    }
}

customElements.define("loss-popup",losspopup)
export default losspopup;

