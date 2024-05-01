

class welcomePage extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        fetch("components/welcome page/welcomepage.html")
        .then(response=>response.text())
        .then(html=>{
            this.innerHTML=html;
        }).catch(error => console.error(error))
    }
}

customElements.define("welcome-page",welcomePage)
export default welcomePage;

