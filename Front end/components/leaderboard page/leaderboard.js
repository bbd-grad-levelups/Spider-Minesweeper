import { getHTML } from "../../util/common.js";
class leaderboard extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){

        getHTML("components/leaderboard page/leaderboardpage.html").then(html =>{
            this.innerHTML=html;
            document.dispatchEvent(new CustomEvent('leaderboard-ready',{detail: leaderboard}))
        }).catch(error =>{
            console.error(error)
        })
        
    }
}

customElements.define("leaderboard-page",leaderboard)
export default leaderboard;

