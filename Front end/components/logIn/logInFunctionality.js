const clientId = 'Iv23liHbiQ9aD6uAgyym';
const redirectUri = 'http://spider-sweeper-the-game.s3.eu-west-1.amazonaws.com/';

function authorize() {
  window.location.href = `http://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
}