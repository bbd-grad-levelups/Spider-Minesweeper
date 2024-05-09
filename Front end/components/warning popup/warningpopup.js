import { getHTML } from "../../util/common.js";

class warningpopup extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        getHTML('components/warning popup/warningpopup.html').then(html =>{
            this.innerHTML=html;
        }).catch(error =>console.error(error));
    }
}

customElements.define("warning-popup",warningpopup)
export default warningpopup;

