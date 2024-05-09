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

let board = getBoard(30,2).gameBoard;
let boardLength = 8;
const numOfSpider = getBoard(30,2).numOfSpider;
let remainingSpidersNum = 10;
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
    document.getElementById("remainingSpiders").textContent = remainingSpidersNum;
};

const clearBoard=()=>{
    document.getElementById('gameBody').innerHTML="";
    board = getBoard(20,8);
    fillBoard();
}

const clickCell=(cellID)=>{
    const pos=cellID.split('-')
    const row=parseInt(pos[0]);
    const col=parseInt(pos[1]);

    revealCell(row,col,cellID);
}

const changeFlagMode=()=>{
    // calcScore()
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

            remainingSpidersNum = remainingSpidersNum + 1;
            document.getElementById("remainingSpiders").textContent = remainingSpidersNum;

            board[row][col].flagged = false;
        }
        else {
            const flagimg=document.createElement('img');
            flagimg.src='./media/images/redflag.svg';
            flagimg.classList.add('flagImg');
            cell.appendChild(flagimg);

            board[row][col].flagged = true;


            remainingSpidersNum = remainingSpidersNum - 1;
            document.getElementById("remainingSpiders").textContent = remainingSpidersNum;
        }
    }
    else {

        board[row][col].revealed = true;

        if (board[row][col].count === -1) {
            // Handle game over
            alert("Game Over! You stepped on a spider.");
            stopTimer();

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

// const checkGameWin = () => {
//     let allRevealed = true;
//     let win = true;

//     for (let i = 0; i < row; i++) {
//         for (let j = 0; j < col; j++) {

//             if (board[i][j].revealed === false && board[i][j].flagged === false) {
//                 allRevealed = false;
//             }
//         }
//     }

//     if (allRevealed === true) {

//         for (let i = 0; i < row; i++) {
//             for (let j = 0; j < col; j++) {

//                 if (board[i][j].flagged === true && board[i][j].count !== -1) {
//                     win = false;
//                 }
//             }
//         }
//     }

//     return win;
// }

const checkGameWin = () => {
    let allRevealed = true;
    let allFlagsValid = true;

    // Check if all cells are revealed
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (!board[i][j].revealed && !board[i][j].flagged) {
                allRevealed = false;
                break;
            }
        }
    }

    // Check if all flagged cells are correct
    if (allRevealed) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j].flagged && board[i][j].count !== -1) {
                    allFlagsValid = false;
                    break;
                }
            }
        }
    }

    // Win condition: All cells revealed and all flags correctly placed
    return allRevealed && allFlagsValid;
}


const timer = () => {
    document.getElementById("timer").textContent = 1;
}

document.addEventListener('populateGameBoard',(event)=>{
    requests=event.detail.requests;
    fillBoard();
})

document.addEventListener('setDifficulty',(event)=>{
    difficulty=event.detail.difficulty
})

const calcScore=()=>{
    const multiplier=requests.getMultiplier(difficulty,size)

    multiplier.then(data=>{
        console.log(data)
    })
}




















let timerInterval;
let startTime;
let elapsedTime = 1000; // Initial elapsed time in milliseconds

function startTimer() {
    startTime = Date.now() + elapsedTime; // Start time is current time plus initial elapsed time
    timerInterval = setInterval(updateTimer, 1000); // Update timer every second (1000 milliseconds)
}

function updateTimer() {
    const now = Date.now();
    elapsedTime = startTime - now; // Calculate remaining time by subtracting current time from start time
    if (elapsedTime <= 0) {
        stopTimer(); // Stop the timer when elapsed time reaches 0
        displayTime(0); // Display 0 seconds
    } else {
        displayTime(Math.floor(elapsedTime / 1000)); // Convert elapsed time from milliseconds to seconds and display
    }
}

function displayTime(time) {
    const timerElement = document.getElementById('timer');
    console.log('formatTime(time): ' + formatTime(time));
    timerElement.textContent = `${formatTime(time)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function stopTimer() {
    clearInterval(timerInterval);
}


// function resetTimer() {
//     clearInterval(timerInterval);
//     elapsedTime = 0;
//     displayTime(elapsedTime);
// }