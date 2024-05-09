const selectDifficulty=((event)=>{
    const difficulty=event.target.textContent.toLowerCase();
    document.dispatchEvent(new CustomEvent("setDifficulty",{detail:{difficulty:difficulty}}))
    handleButtonClick('game page')
})