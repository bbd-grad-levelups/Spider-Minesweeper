
const populateBoard = (event) => {
    const data=event.detail.getLeaderboard();
    data.then(data=>{
        console.log(data)
        const board = document.getElementsByClassName("board")[0];
        data.forEach((element, index) => {
            let section = document.createElement('section');
            let first = document.createElement('section');
            let second = document.createElement('section');
            let last = document.createElement('section');
            first.textContent = index;
            second.textContent = element["playerName"];
            last.textContent = element['playerScore'];
            first.classList.add("outer");
            last.classList.add("outer");
            second.classList.add("inner")
            if (index % 2 == 0) {
                section.classList.add("boardSectionEven");
            } else {
                section.classList.add("boardSection");
            }
            section.appendChild(first);
            section.appendChild(second);
            section.appendChild(last);
            board.appendChild(section);
        });

    })

}

const goBack=()=>{
    history.back()
}

document.addEventListener("popoulateLeaderBoard", populateBoard);