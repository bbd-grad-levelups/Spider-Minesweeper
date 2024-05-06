// const board = [
//   [-1, -1, 1, 0, 1, 1, 1, 0],
//   [3, 3, 1, 0, 2, -1, 3, 1],
//   [-1, 2, 0, 0, 2, -1, 3, -1],
//   [-1, 3, 1, 1, 1, 2, 4, 3],
//   [1, 2, -1, 1, 0, 1, -1, -1],
//   [0, 1, 1, 2, 1, 2, 2, 2],
//   [0, 1, 2, 4, -1, 3, 1, 0],
//   [0, 1, -1, -1, -1, -1, 1, 0],
// ];
const board = [
    [-1, -1, 1, 0],
    [3, 3, 1, 0],
    [-1, 2, 0, 0],
    [-1, 3, 1, 1]
  ];
const size = board.length;

const openBoard = Array.from({ length: size }, () => Array(size).fill(0)); //0 means closed, 1 means open, -1 means flagged

let modeFlag=false;
const fillBoard = () => {
    const grid=document.createElement('article');
    grid.classList.add('gameGrid');

    for (let i = 0; i < board.length; i++) {
        const row = document.createElement('section');
        row.classList.add('row');

        for (let j = 0; j < board[i].length; j++) {
            const cell = document.createElement('button');
            cell.classList.add('coloumn');
            cell.onclick=()=>clickCell(cell.id)
            cell.id = `${i}-${j}`; // Setting id based on row and column
            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
    document.getElementById('gameBody').appendChild(grid);
};


document.addEventListener('populateGameBoard',()=>{
    fillBoard();
})  

const clearBoard=()=>{
    document.getElementById('gameBody').innerHTML="";
    openBoard.forEach(row => row.fill(0));
    fillBoard();
}

const changeFlagMode=()=>{
    modeFlag=!modeFlag;
    
    if(modeFlag){
        document.getElementById('flagInidcator').src="./media/images/greenflag.svg"
    }else{
        document.getElementById('flagInidcator').src="./media/images/redflag.svg"
    }
}

const clickCell=(cellID)=>{
    const pos=cellID.split('-')
    const row=parseInt(pos[0]);
    const col=parseInt(pos[1]);
    const val=board[row][col];
    if(openBoard[row][col] === 0){
        if(!modeFlag){
            document.getElementById(cellID).textContent=val;
            openBoard[row][col]=1 
        }else{
            const flagimg=document.createElement('img');
            flagimg.src='./media/images/redflag.svg';
            flagimg.classList.add('flagImg')
            document.getElementById(cellID).appendChild(flagimg)
            openBoard[row][col]=-1;
        }

        
    }else if(modeFlag && openBoard[row][col]===-1){
        document.getElementById(cellID).removeChild(document.getElementById(cellID).firstChild)
        openBoard[row][col]=0;
    }
    
}