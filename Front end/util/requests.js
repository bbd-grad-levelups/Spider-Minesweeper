class Requests {
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
}


export default Requests;