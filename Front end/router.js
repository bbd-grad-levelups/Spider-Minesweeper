import welcomePage from "./components/welcome page/welcomepage.js";
import leaderboard from "./components/leaderboard page/leaderboard.js";
import newgamePopup from "./components/new game popup/newgamePopup.js";
import popups from "./components/popups/popups.js";
import instructionPopup from "./components/instructions popup/instructions.js";
import victorypopup from "./components/victory popup/victorypopup.js";
import losspopup from "./components/loss popup/losspopup.js";
import warningpopup from "./components/warning popup/warningpopup.js";
import gamePage from "./components/game page/gamepage.js";
let currentPage="welcome page";
let currPopup=null;

const pageToObject={
    "welcome page": ()=>{return new welcomePage()},
    "leaderboard page": ()=>{return new leaderboard()},
    "new game popup":()=>{return new newgamePopup()},
    "instructions popup":()=>{return new instructionPopup()},
    "victory popup":()=>{return new victorypopup()},
    "popups":()=>{return new popups()},
    "loss popup":() =>{return new losspopup()},
    "warning popup":()=>{return new warningpopup()},
    "game page":()=>{return new gamePage()}
}

const popupToColour={
    "new game popup":"#777CA4",
    "instructions popup":"#99B8AA",
    "victory popup":"#FD7461",
    "warning popup":"#FD7461",
    "loss popup":"#555A80",
}

const nav = (newPage) => {
    currentPage=newPage
    const newPageContent=pageToObject[currentPage]();
    document.body.innerHTML='';
    newPageContent.classList.add('generalContent');
    console.log(newPageContent)
    document.body.appendChild(newPageContent);
    window.history.pushState({ page: currentPage }, "", window.location.pathname);

}

const openPopup =() =>{
    
    const popup=pageToObject["popups"]();
    popup.setAttribute('id','openPopup')
    popup.classList.add("popupContainer")
    document.body.appendChild(popup);

}

const createChildrenContent=() =>{
    

    const popup=pageToObject[currPopup]();
    const popupContainer= document.getElementById('openPopup');
    popup.classList.add('generalContent')
    popupContainer.childNodes[15].style.backgroundColor=popupToColour[currPopup]
    popupContainer.children[6].children[1].appendChild(popup)
}

const closePopup = () =>{
    
    const popup=document.getElementById('openPopup');

    if(popup){
        currPopup=null;
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

document.addEventListener('popup-ready',(event)=>{
    createChildrenContent()
})
document.addEventListener('TriggerRouting', (event) =>{
    nav(event.detail.message);
})

document.addEventListener('openPopup',(event) =>{
    closePopup();
    currPopup=event.detail.message;
    openPopup();
})

document.addEventListener('closePopup',()=>{
    closePopup();
})