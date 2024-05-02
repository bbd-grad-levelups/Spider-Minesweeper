class leaderboard extends HTMLElement {
    constructor(){
        super();
    }
    connectedCallback(){
        fetch("components/leaderboard page/leaderboardpage.html")
        .then(response=>response.text())
        .then(html=>{
            this.innerHTML=html;
            document.dispatchEvent(new CustomEvent('leaderboard-ready',{detail: leaderboard}))
        }).catch(error => console.error(error))

        
    }
}

customElements.define("leaderboard-page",leaderboard)
export default leaderboard;

