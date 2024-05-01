import welcomePage from "./components/welcome page/welcomepage.js";
import leaderboard from "./components/leaderboard page/leaderboard.js";

let currenPage="welcome page";

const nameToFile={
    "welcome page":"./components/welcome page/",
    "leaderboard page":"./componenets/leaderboard page/"
}

const pageToObject={
    "welcome page": ()=>{return new welcomePage()},
    "leaderboard page": ()=>{return new leaderboard()},
}

const nav = (newPage) => {
    currenPage=newPage
    const newPageContent=pageToObject[currenPage]();
    document.body.innerHTML='';
    newPageContent.classList.add('generalContent');
    document.body.appendChild(newPageContent);

    if(newPage==="leaderboard page"){
        document.dispatchEvent(new CustomEvent("popoulateLeaderBoard"))
    }
}


nav("welcome page")

document.addEventListener('TriggerRouting', (event) =>{
    nav(event.detail.message);
})
