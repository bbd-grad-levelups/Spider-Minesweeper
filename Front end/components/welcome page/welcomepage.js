import { getHTML } from "../../util/common.js";

class welcomePage extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        getHTML("components/welcome page/welcomepage.html").then(html=>{
            this.innerHTML=html;
            document.dispatchEvent(new CustomEvent("getRequests"))
        }).catch(error=>console.error(error))
    }
}

customElements.define("welcome-page",welcomePage)
export default welcomePage;
