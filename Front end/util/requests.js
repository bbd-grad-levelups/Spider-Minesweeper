class Requests {
    jwt = null;

    constructor() {
        this.baseURL = "http://spider-sweeper-env.eba-z92mr8uh.eu-west-1.elasticbeanstalk.com/"
    }

    getBoard(difficulty,boardSize) {

      let gameDifficulty = 10;
      if (difficulty === 'Medium') {
        gameDifficulty = 15;
      } else if (difficulty === 'Hard') {
        gameDifficulty = 20;
      }
      let gameSize = 8;
      
        return {
          board: createBoard(gameDifficulty, gameSize),
          spiderNum: Math.round((gameDifficulty / 100) * gameSize ** 2),
          gameId: undefined
        };
            
    }

    getLeaderboard() {
        const endpoint = "scores/leaderboard";

        return fetch(this.baseURL + endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network Response was not okay ', response);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    getMultiplier(difficulty,size){
        const endpoint="modifiers/multiplier";
        const queryParams={boardSize:size,difficulty:difficulty};
        const queryString = new URLSearchParams(queryParams).toString();

        return fetch(this.baseURL+endpoint+"?"+queryString).then(response => {
                if (!response.ok) {
                    throw new Error('Network Response was not okay ', response);
                }
                return response.json();
            })
            .catch(error => {
                console.error("Error: ", error);
            });
    }

    getJWT(code) {
        const endpoint="login";

        return fetch(this.baseURL+endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        })
        .then(response => {
            return response.json();
        });
    }

    saveJWT(jwt) {
        this.jwt = jwt;
    }

    getUserName(){
        const endpoint="login/username";

        return fetch(this.baseURL+endpoint,{
            method: "GET",
            headers:{
                'Authorization': "Bearer "+this.jwt
            }
        }).then(response =>{
            if (!response.ok) {
                throw new Error('Network Response was not okay ', response);
            }
            return response.json();

        })
    }

    getHighScore(){
        const endpoint="scores/highscore";

        return fetch(this.baseURL+endpoint,{
            method: "GET",
            headers:{
                'Authorization': "Bearer "+this.jwt
            }
        }).then(response =>{
            if (!response.ok) {
                throw new Error('Network Response was not okay ', response);
            }
            return response.json();
        })
    }

    submitScore(gameId, score){
      const endpoint="scores/submit";
      const queryParams={gameId:gameId, score:score};
      const queryString = new URLSearchParams(queryParams).toString();

      return fetch(this.baseURL+endpoint+"?"+queryString).then(response =>{
          if (!response.ok) {
            throw new Error('Network Response was not okay ', response);
          }
          return response.json();
      }).catch(error => {
          console.error("Error: ", error);
      });
    }
}

function createBoard(difficulty, boardLength) {
  const numOfSpider = Math.round((difficulty / 100) * boardLength ** 2);
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

  return { gameBoard, numOfSpider };
}

export default Requests;