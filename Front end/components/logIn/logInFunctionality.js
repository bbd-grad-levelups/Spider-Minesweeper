const clientId = 'Iv23liHbiQ9aD6uAgyym';
const redirectUri = 'https://bbd-grad-levelups.github.io/Spider-Minesweeper/';
const requests = require('../../util/requests');

function authorize() {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
}

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
  let jwt = requests.getJWT(code);
  console.log('Our jwt: ' + jwt);
}
