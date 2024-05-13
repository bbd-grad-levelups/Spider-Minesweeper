const handleButtonClick=(newPage)=>{
    const eventData={message:newPage};
    const event = new CustomEvent('TriggerRouting',{detail: eventData});
    document.dispatchEvent(event);
}

const openNewGamePopup=()=>{
     const eventData={message:"new game popup"};
    const event = new CustomEvent('openPopup',{detail: eventData});
    document.dispatchEvent(event);
}
const openInstructionsPopup=()=>{
    const eventData={message:"instructions popup"};
    const event = new CustomEvent('openPopup',{detail: eventData});
    document.dispatchEvent(event);
}

requests=null;

document.addEventListener("sendWelcomeRequests",(event)=>{
    document.getElementById("WelcomeUser").textContent="Welcome Human";
})