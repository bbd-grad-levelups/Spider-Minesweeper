import welcomePage from "./components/welcome page/welcomepage.js";
import leaderboard from "./components/leaderboard page/leaderboard.js";
import newgamePopup from "./components/new game popup/newgamePopup.js";
let currentPage="welcome page";
const nameToFile={
    "welcome page":"./components/welcome page/",
    "leaderboard page":"./componenets/leaderboard page/"
}

const pageToObject={
    "welcome page": ()=>{return new welcomePage()},
    "leaderboard page": ()=>{return new leaderboard()},
    "new game popup":()=>{return new newgamePopup()}
}


const nav = (newPage) => {
    currentPage=newPage
    const newPageContent=pageToObject[currentPage]();
    document.body.innerHTML='';
    newPageContent.classList.add('generalContent');
    document.body.appendChild(newPageContent);

    // const url = window.location.pathname + '?page=' + currentPage.replace(/ /g, '-');
        window.history.pushState({ page: currentPage }, "", window.location.pathname);

}

const openPopup =(popupName) =>{
    closePopup();
    const popup=pageToObject[popupName]();
    popup.setAttribute('id','openPopup')
    popup.classList.add("popupContainer")
    document.body.appendChild(popup);

}

const closePopup = () =>{
    const popup=document.getElementById('openPopup');

    if(popup){
        document.body.removeChild(popup);
    }
}

const handlePopState = (event) => {
    const page = event.state ? event.state.page : "welcome page";
    nav(page, false);
};

window.addEventListener('popstate', handlePopState);
nav("welcome page")


document.addEventListener('leaderboard-ready',()=>{
    document.dispatchEvent(new CustomEvent("popoulateLeaderBoard"))
})

document.addEventListener('TriggerRouting', (event) =>{
    nav(event.detail.message);
})

document.addEventListener('openPopup',(event) =>{
    openPopup(event.detail.message);
})

document.addEventListener('closePopup',()=>{
    closePopup();
})