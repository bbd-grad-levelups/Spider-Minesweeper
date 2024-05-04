import welcomePage from "./components/welcome page/welcomepage.js";
import leaderboard from "./components/leaderboard page/leaderboard.js";
import newgamePopup from "./components/new game popup/newgamePopup.js";
import popups from "./components/popups/popups.js";


let currentPage="welcome page";
let currPopup=null;

const pageToObject={
    "welcome page": ()=>{return new welcomePage()},
    "leaderboard page": ()=>{return new leaderboard()},
    "new game popup":()=>{return new newgamePopup()},
    "popups":()=>{return new popups()}
}


const nav = (newPage) => {
    currentPage=newPage
    const newPageContent=pageToObject[currentPage]();
    document.body.innerHTML='';
    newPageContent.classList.add('generalContent');
    document.body.appendChild(newPageContent);
    window.history.pushState({ page: currentPage }, "", window.location.pathname);

}

const openPopup =() =>{
    closePopup();
    const popup=pageToObject["popups"]();
    popup.setAttribute('id','openPopup')
    popup.classList.add("popupContainer")
    document.body.appendChild(popup);

}

const createChildrenContent=() =>{
    
    const popup=pageToObject[currPopup]();
    const popupContainer= document.getElementById('openPopup');
    popup.classList.add('generalContent')
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
    currPopup=event.detail.message;
    console.log(currPopup)
    openPopup();
})

document.addEventListener('closePopup',()=>{
    closePopup();
})