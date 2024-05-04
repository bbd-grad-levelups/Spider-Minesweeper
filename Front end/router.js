import welcomePage from "./components/welcome page/welcomepage.js";
import leaderboard from "./components/leaderboard page/leaderboard.js";
import logIn from "./components/logIn page/logIn.js";
import newgamePopup from "./components/new game popup/newgamePopup.js";
import popups from "./components/popups/popups.js";
import instructionPopup from "./components/instructions popup/instructions.js";
import victorypopup from "./components/victory popup/victorypopup.js";
import losspopup from "./components/loss popup/losspopup.js";
import warningpopup from "./components/warning popup/warningpopup.js";

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
    "warning popup":()=>{return new warningpopup()}
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

document.addEventListener('logInOauth-ready',()=>{
    document.dispatchEvent(new CustomEvent("logInOauth"))
})


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










const logInOauth = () => {
    const clientId = 'Iv1.2ade9f2605804190';
    const clientSecret = '33296377811069e297b79cd0deb2d1526e4bca88';
    const redirectUri = 'http://127.0.0.1:5501/Front%20end/index.html?page=logIn-page'; // Update with your redirect URI
    const scope = 'user';

    console.log("in loginOAUTH")

    function authorize() {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    }

    authorize();

    async function exchangeCodeForToken(code) {
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri
        })
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error_description || 'Failed to exchange code for token');
    }
    return data.access_token;
    }

    async function getUserData(accessToken) {
    const response = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    return response.json();
    }

    async function generateJWT(code) {
    const accessToken = await exchangeCodeForToken(code);
    const userData = await getUserData(accessToken);

    const jwt = jose.JWT.sign({
        sub: userData.login,
        exp: Math.floor(Date.now() / 1000) + 3600
    }, clientSecret, {
        algorithm: 'RS256'
    });

    console.log('JWT:', jwt);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
    generateJWT(code)
        .catch(error => console.error('Error generating JWT:', error));
    }

  }