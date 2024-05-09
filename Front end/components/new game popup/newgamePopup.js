import { getHTML } from "../../util/common.js";

class newgamePopup extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        getHTML('components/new game popup/newgamePopup.html').then(html =>{
            this.innerHTML=html;
        }).catch(error =>console.error(error));
    }
}

customElements.define("newgame-popup",newgamePopup)
export default newgamePopup;

