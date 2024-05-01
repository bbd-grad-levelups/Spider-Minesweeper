import welcomePage from "./components/welcome page/welcomepage.js";

const nameToFile={
    "welcome page":"./components/welcome page/"
}


const newWelcomePage=new welcomePage();
newWelcomePage.classList.add("generalContent")
console.log(newWelcomePage)
document.body.appendChild(newWelcomePage)
