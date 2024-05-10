import { getHTML } from "../../util/common.js";

class victorypopup extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        getHTML('components/victory popup/victorypopup.html').then(html =>{
            this.innerHTML=html;
        }).catch(error =>console.error(error));
    }
}

customElements.define("victory-popup",victorypopup)
export default victorypopup;

