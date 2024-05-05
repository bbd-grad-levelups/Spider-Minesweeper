const spiderNumber = {
	'easy': 2,
	'middle': 4,
	'hard': 8,
};

let boardLength = 8;

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function initializeBoard(difficulty, boardLength) {
	const numOfSpider = spiderNumber[difficulty];

	let gameBoard = [];

	for (let i = 0; i < boardLength; i++) {
			gameBoard[i] = [];
			for(let j = 0; j < boardLength; j++) {
					gameBoard[i][j] = {
						revealed: false,
						count: 0,
					};
			}
	}

	const spiderPositions = [];

	for (let i = 0; i < numOfSpider; i++) {

			let newPositionX = getRandomInt(0, boardLength - 1);
			let newPositionY = getRandomInt(0, boardLength - 1);

			while (gameBoard[newPositionX][newPositionY].count !== -1){
					newPositionX = getRandomInt(0, boardLength - 1);
					newPositionY = getRandomInt(0, boardLength - 1);
					gameBoard[newPositionX][newPositionY].count = -1;
			}

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

	return gameBoard;
}

const gameBoard =
	document.getElementById(
		"gameBoard"
	);
let board = [];

board = initializeBoard('hard',8);
console.log(board);

function revealCell(row, col) {
	if (row < 0 || row >= boardLength || col < 0 || col >= boardLength || board[row][col].revealed) {
		return;
	}

	board[row][col].revealed = true;

	if (board[row][col].count === -1) {
		// Handle game over
		alert(
			"Game Over! You stepped on a spider."
		);
	} else if (board[row][col].count === 0) {
		// If cell has no mines nearby,
		// Reveal adjacent cells
		for (let dx = -1;dx <= 1;dx++) {
			for (let dy = -1;dy <= 1;dy++) {
				revealCell(row + dx,col + dy);
			}
		}
	}

	renderBoard();
}

function renderBoard() {
	gameBoard.innerHTML = "";

	for (let i = 0; i < boardLength; i++) {
		for (let j = 0;j < boardLength;j++) {
			const cell =document.createElement("div");
			cell.className = "cell";
			if (board[i][j].revealed) {
				cell.classList.add(
					"revealed"
				);
				if (board[i][j].isMine) {
					cell.classList.add("mine");
					cell.textContent ="spider";
				} else if (board[i][j].count >0) {
					cell.textContent =board[i][j].count;
				}
			}
			cell.addEventListener("click", () => revealCell(i, j));
			gameBoard.appendChild(cell);
		}
		gameBoard.appendChild(document.createElement("br"));
	}
}

initializeBoard();
renderBoard();
