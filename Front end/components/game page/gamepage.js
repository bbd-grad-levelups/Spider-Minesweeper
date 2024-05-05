import { getHTML } from "../../util/common.js";
class gamePage extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){

        getHTML("components/game page/gamepage.html").then(html =>{
            this.innerHTML=html;
           // document.dispatchEvent(new CustomEvent('leaderboard-ready',{detail: gamePage})) -> change this to be game page ready when dynamically adding content
        }).catch(error =>{
            console.error(error)
        })
        
    }
}

customElements.define("game-page",gamePage)
export default gamePage;

