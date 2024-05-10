import { getHTML } from "../../util/common.js";

class popups extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        getHTML('components/popups/popups.html').then(html =>{
            this.innerHTML=html;
            document.dispatchEvent(new CustomEvent('popup-ready'))
        }).catch(error =>console.error(error));
    }
}

customElements.define("general-popups",popups)
export default popups;

