data = [
    {"position": 1, "name": "test subject 1", "points": 900},
    {"position": 2, "name": "test subject 2", "points": 800},
    {"position": 3, "name": "test subject 3", "points": 700},
    {"position": 4, "name": "test subject 4", "points": 600},
    {"position": 5, "name": "test subject 5", "points": 500},
    {"position": 6, "name": "test subject 6", "points": 400},
    {"position": 7, "name": "test subject 7", "points": 300},
    {"position": 8, "name": "test subject 8", "points": 200},
    {"position": 9, "name": "test subject 9", "points": 100},
    {"position": 10, "name": "test subject 10", "points": 50}
]



const populateBoard = (event) => {
    const board = document.getElementsByClassName("board")[0];
    data.forEach((element, index) => {
        let section = document.createElement('section');
        let first = document.createElement('section');
        let second = document.createElement('section');
        let last = document.createElement('section');
        first.textContent = element["position"];
        second.textContent = element["name"];
        last.textContent = element['points'];
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
}



document.addEventListener("popoulateLeaderBoard", populateBoard);