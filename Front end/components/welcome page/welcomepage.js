import { getHTML } from "../../util/common.js";
class welcomePage extends HTMLElement {
    constructor(){
        super();
        
    }
    connectedCallback(){
        getHTML("components/welcome page/welcomepage.html").then(html=>{
            this.innerHTML=html;
        }).catch(error=>console.error(error))

        const styleSheet = document.createElement('link');
        styleSheet.rel = 'stylesheet';
        styleSheet.href = 'style.css';
    }


}

customElements.define("welcome-page",welcomePage)
export default welcomePage;
