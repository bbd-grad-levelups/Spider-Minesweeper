class logIn extends HTMLElement {
    constructor(){
        super();
    }
    // connectedCallback(){
    //     fetch("components/logIn page/logIn.html")
    //     .then(response=>response.text())
    //     .then(html=>{
    //         this.innerHTML=html;
    //         document.dispatchEvent(new CustomEvent('logInOauth'))
    //     }).catch(error => console.error(error))
    // }
}

customElements.define("login-page",logIn)
export default logIn;

