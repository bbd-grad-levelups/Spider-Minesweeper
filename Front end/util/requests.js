class Requests {
    jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExMTk2MzIwNiwidXNlcm5hbWUiOiJQcm9mLUxpZ2h0IiwiaWF0IjoxNzE1MjYzNzM2LCJleHAiOjE3MTUyNjczMzZ9.3-TeaSiMnE1W8If062H0aDgloRUJnYhPq2FePZDsMpk";

    constructor() {
        this.baseURL = "http://spider-sweeper-env.eba-z92mr8uh.eu-west-1.elasticbeanstalk.com/"
    }

    getLeaderboard() {
        const endpoint = "scores/leaderboard";
        return fetch(this.baseURL + endpoint)
            .then(response => {
                if (!response.ok) {
                    console.log(response)
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

        console.log(this.baseURL+endpoint+"?"+queryString);
        return fetch(this.baseURL+endpoint+"?"+queryString).then(response => {
                if (!response.ok) {
                    console.log(response.status)
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
            return response.json();
        })
    }
}


export default Requests;