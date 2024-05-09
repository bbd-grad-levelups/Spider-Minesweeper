let numOfNonSpider=0;
let openSlots=0;
let modeFlag=false;
let difficulty=null;
let requests=null;
let score=1000;
let multiplier=0;
let username;
let timerInterval;
let startTime;
let elapsedTime = 0;
let currentGameId = -1;

const fillBoard = () => {
    getUserName();
    const grid=document.createElement('article');
    grid.classList.add('gameGrid');

    for (let i = 0; i < board.length; i++) {
        const row = document.createElement('section');
        row.classList.add('row');

        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement('button');
            cell.id = `${i}-${j}`;
            cell.onclick=()=>clickCell(cell.id);
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
    document.getElementById('gameBody').appendChild(grid);
    document.getElementById("remainingSpiders").textContent = formatNumber(numOfSpider);
    document.getElementById('Score').textContent = `Score: ${formatNumber(score*multiplier)}`;
};

const clearBoard=()=>{
    
    seconds=0;  
    document.getElementById('gameBody').innerHTML="";
    boardInfo = requests.getBoard(difficulty, 'large');

    boardInfo.then((data) =>{

        board = data.board.gameBoard;
        numOfSpider = data.spiderNum;
        currentGameId = data.gameId;

        numOfNonSpider=(board.length*board.length)-numOfSpider;
        openSlots=0;
        fillBoard();
        resetTimer();
        document.getElementById('Score').textContent = 'Score: 000';
    })
}

const clickCell=(cellID)=>{
    const pos=cellID.split('-')
    const row=parseInt(pos[0]);
    const col=parseInt(pos[1]);

    revealCell(row,col,cellID);
}

const changeFlagMode=()=>{
    modeFlag=!modeFlag;

    if(modeFlag){
        document.getElementById('flagInidcator').src="./media/images/greenflag.svg"
    }else{
        document.getElementById('flagInidcator').src="./media/images/redflag.svg"
    }
}

function revealCell(row, col, cellID) {

	if (row < 0 || row >= board.length || col < 0 || col >= board[row].length || board[row][col].revealed) {
		return;
	}

    startTimer();

    const cell = document.getElementById(cellID);


    if (modeFlag) {

        if (board[row][col].flagged === true) {


            cell.removeChild(cell.querySelector('.flagImg'));

            numOfSpider = numOfSpider + 1;
            document.getElementById("remainingSpiders").textContent = formatNumber(numOfSpider);

            board[row][col].flagged = false;
        }
        else {
            const flagimg=document.createElement('img');
            flagimg.src='./media/images/redflag.svg';
            flagimg.classList.add('flagImg');
            cell.appendChild(flagimg);

            board[row][col].flagged = true;


            numOfSpider = numOfSpider - 1;
            document.getElementById("remainingSpiders").textContent = formatNumber(numOfSpider);
        }
    }
    else {

        if (board[row][col].flagged) {
            return;
        }

        board[row][col].revealed = true;

        openSlots++;
        if(checkGameWin()){
            document.dispatchEvent(new CustomEvent('openPopup',{detail:{message:"victory popup"}}))
            resetTimer();
            document.getElementById('Score').textContent = 'Score: 000';

            requests.submitScore(currentGameId, (score - seconds) * multiplier);
        }
        if (board[row][col].count === -1) {
            document.dispatchEvent(new CustomEvent('openPopup',{detail:{message:"loss popup"}}))
            resetTimer();
            document.getElementById('Score').textContent = 'Score: 000';

            cell.classList.add("mine");
            const flagimg=document.createElement('img');
            flagimg.src='./media/images/Angry Spider.svg';
            flagimg.classList.add('flagImg')
            cell.appendChild(flagimg)
        }
        else if (board[row][col].count === 0) {

            cell.classList.add("revealed");
            // If cell has no mines nearby,
            // Reveal adjacent cells
            for (let dx = -1;dx <= 1;dx++) {

                for (let dy = -1;dy <= 1;dy++) {

                    revealCell(row + dx,col + dy,  `${row + dx}-${col + dy}`);
                }
            }
        }
        else if (board[row][col].count > 0) {
            cell.textContent = board[row][col].count;
        }
    }

}

const checkGameWin = () => {

    if(openSlots===numOfNonSpider){
        return true;
    }
    return false;
}

const getMultiplier=(difficulty)=>{
    const multiplierReq=requests.getMultiplier(difficulty,'large')

    multiplierReq.then(data=>{
        multiplier=data.Multiplier;
    })
}

function startTimer() {
    if (timerInterval === null) { // Check if timerInterval is null
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 1000); // Update timer every 100 milliseconds
    }
}

function updateTimer() {
    // const now = Date.now();
    // elapsedTime = now - startTime;
    seconds++;
    displayTime(seconds);
}

function displayTime(time) {
    // const seconds = Math.floor((time % 60000) / 1000);

    document.getElementById('timer').textContent = `${formatNumber(time)}`;
    document.getElementById('Score').textContent = `Score: ${formatNumber((score-seconds)*multiplier)}`;
}

function formatNumber(number) {
    return String(number).padStart(3, '0');
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    seconds=0;
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    displayTime(elapsedTime);
    startTime = Date.now() - elapsedTime;
}

const getUserName=()=>{
    console.log("USER NAME GOT")
    requests.getUserName().then(data=>{
        if(data.userName !==undefined){
        document.getElementById("enjoyUser").textContent="Enjoy the game, "+data.userName;
        }
    })
}

document.addEventListener('populateGameBoard',(event)=>{
    requests=event.detail.requests;
    clearBoard();
    getMultiplier(difficulty);
    resetTimer();
    document.getElementById('Score').textContent = 'Score: 000';

})

document.addEventListener('setDifficulty',(event)=>{
    difficulty=event.detail.difficulty
})
