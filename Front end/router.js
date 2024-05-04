import welcomePage from "./components/welcome page/welcomepage.js";
import leaderboard from "./components/leaderboard page/leaderboard.js";
import logIn from "./components/logIn page/logIn.js";
import newgamePopup from "./components/new game popup/newgamePopup.js";
let currentPage="welcome page";
const nameToFile={
    "welcome page":"./components/welcome page/",
    "leaderboard page":"./componenets/leaderboard page/",
    "logIn page":"./components/logIn page/"
}

const pageToObject={
    "welcome page": ()=>{return new welcomePage()},
    "leaderboard page": ()=>{return new leaderboard()},
    "login page": () => {return new logIn()},
    "new game popup":()=>{return new newgamePopup()},
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

document.addEventListener('logInOauth-ready',()=>{
    document.dispatchEvent(new CustomEvent("logInOauth"))
})


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