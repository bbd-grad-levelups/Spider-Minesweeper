function getBoard(difficulty, boardLength) {
    console.log('difficulty: ' + difficulty);
    console.log('boardLength: ' + boardLength);

    const numOfSpider = Math.round((difficulty / 100) * boardLength ** 2);

    console.log('numOfSpider: ' + numOfSpider);

    let gameBoard = [];

	for (let i = 0; i < boardLength; i++) {
			gameBoard[i] = [];
			for(let j = 0; j < boardLength; j++) {
					gameBoard[i][j] = {
						revealed: false,
                        flagged: false,
						count: 0,
					};
			}
	}

    var spiderPositions = [];
    for (let i = 0; i < numOfSpider; i++) {

        let newPositionX = Math.round(Math.random() * (boardLength -1));
        let newPositionY = Math.round(Math.random() * (boardLength -1));

        while (gameBoard[newPositionX][newPositionY].count === -1){
            newPositionX = Math.round(Math.random() * (boardLength -1));
            newPositionY = Math.round(Math.random() * (boardLength -1));

        }
        gameBoard[newPositionX][newPositionY].count = -1;


        spiderPositions.push([newPositionX, newPositionY]);
    }

    for (const [x, y] of spiderPositions) {
        for (let i = Math.max(0, x - 1); i <= Math.min(boardLength - 1, x + 1); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(boardLength - 1, y + 1); j++) {
                if (gameBoard[i][j].count !== -1) {
                        gameBoard[i][j].count += 1;
                }
            }
        }
    }

    console.log(gameBoard);

    return { gameBoard, numOfSpider };
  }

let board = getBoard(30,3).gameBoard;
let boardLength = 8;
let numOfSpider = getBoard(30,3).numOfSpider;
let numOfNonSpider=0;
let openSlots=0;
// let remainingSpidersNum = 10;
let modeFlag=false;


const fillBoard = () => {
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
};

const clearBoard=()=>{
    document.getElementById('gameBody').innerHTML="";
    board = getBoard(30,3).gameBoard;
    numOfSpider = getBoard(30,3).numOfSpider;
    numOfNonSpider=(board.length*board.length)-numOfSpider;
    openSlots=0;
    // remainingSpidersNum = 10;
    fillBoard();
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

        board[row][col].revealed = true;

        openSlots++;
        if(checkGameWin()){
            document.dispatchEvent(new CustomEvent('openPopup',{detail:{message:"victory popup"}}))
        }
        if (board[row][col].count === -1) {
            // Handle game over
            //alert("Game Over! You stepped on a spider.");
            document.dispatchEvent(new CustomEvent('openPopup',{detail:{message:"loss popup"}}))
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
    // let allRevealed = true;
    // let win = false;
    // for (let i = 0; i < board.length; i++) {
    //     for (let j = 0; j < board.length; j++) {

    //         if (board[i][j].revealed === false && board[i][j].flagged === false) {
    //             allRevealed = false;
    //         }
    //     }
    // }

    // if (allRevealed === true) {

    //     for (let i = 0; i < board.length; i++) {
    //         for (let j = 0; j < board.length; j++) {

    //             if (board[i][j].count === -1 && board[i][j].flagged === false) {
    //                 win = false;
    //             }
    //             else{
    //                 win = true;
    //             }
    //         }
    //     }
    // }

    // return win;

    // let allRevealed = true;
    // let win = false;
    // console.log(board)
    // // First loop to check if all non-flagged cells are revealed



    // for (let i = 0; i < board.length; i++) {
    //     for (let j = 0; j < board[i].length; j++) {
    //         if (!board[i][j].revealed && !board[i][j].flagged) {
    //             console.log(i,j)
    //             console.log(board[i][j].revealed, board[i][j].flagged)
    //             allRevealed = false;
    //             break; // No need to continue checking if one cell is not revealed and not flagged
    //         }
    //     }
    //     if (!allRevealed) {
    //         break; // If at least one cell is not revealed and not flagged, break the outer loop
    //     }
    // }
    // console.log("all revealed",allRevealed)
    // // If all cells are revealed, check if they are correctly flagged as mines
    // if (allRevealed) {
    //     win = true; // Assume win until proven otherwise
    //     for (let i = 0; i < board.length; i++) {
    //         for (let j = 0; j < board[i].length; j++) {
    //             if (board[i][j].count === -1 && !board[i][j].flagged) {
    //                 win = false; // If any mine cell is not flagged, player hasn't won
    //                 break; // No need to continue checking
    //             }
    //         }
    //         if (!win) {
    //             break; // If win condition is not met, break the outer loop
    //         }
    //     }
    // }

    // return win;

}


const timer = () => {
    document.getElementById("timer").textContent = 1;
}

document.addEventListener('populateGameBoard',(event)=>{
    requests=event.detail.requests;
    clearBoard();
})

document.addEventListener('setDifficulty',(event)=>{
    difficulty=event.detail.difficulty
})



















let timerInterval;
let startTime;
let elapsedTime = 0;

console.log('timerElement: ' + timerElement);

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 100); // Update timer every 100 milliseconds
}

function updateTimer() {
    const now = Date.now();
    elapsedTime = now - startTime;
    displayTime(elapsedTime);
}

function displayTime(time) {
    // const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    // const milliseconds = Math.floor((time % 1000) / 10);
    // const timerElement = ;
    document.getElementById('timer').textContent = `${formatNumber(seconds)}`;
    document.getElementById('Score').textContent = `Score: ${formatNumber(1000-seconds)}`;
    // timerElement.textContent = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function formatNumber(number) {
    return String(number).padStart(3, '0');
}

function stopTimer() {
    clearInterval(timerInterval);
}


// function resetTimer() {
//     clearInterval(timerInterval);
//     elapsedTime = 0;
//     displayTime(elapsedTime);
// }