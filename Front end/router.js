import welcomePage from "./components/welcome page/welcomepage.js";
import leaderboard from "./components/leaderboard page/leaderboard.js";

let currentPage="welcome page";

const nameToFile={
    "welcome page":"./components/welcome page/",
    "leaderboard page":"./componenets/leaderboard page/"
}

const pageToObject={
    "welcome page": ()=>{return new welcomePage()},
    "leaderboard page": ()=>{return new leaderboard()},
}

const nav = (newPage) => {
    currentPage=newPage
    const newPageContent=pageToObject[currentPage]();
    document.body.innerHTML='';
    newPageContent.classList.add('generalContent');
    document.body.appendChild(newPageContent);

    if(newPage==="leaderboard page"){
        document.dispatchEvent(new CustomEvent("popoulateLeaderBoard"))
    }

    const url = window.location.pathname + '?page=' + currentPage.replace(/ /g, '-');
        window.history.pushState({ page: currentPage }, "", url);

}


const handlePopState = (event) => {
    const page = event.state ? event.state.page : "welcome page";
    nav(page, false);
};

window.addEventListener('popstate', handlePopState);
nav("welcome page")

document.addEventListener('TriggerRouting', (event) =>{
    nav(event.detail.message);
})
