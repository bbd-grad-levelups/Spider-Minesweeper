const clientId = 'Iv23liHbiQ9aD6uAgyym';
const redirectUri = 'https://bbd-grad-levelups.github.io/Spider-Minesweeper/';
let request=null

function authorize() {
  document.dispatchEvent(new CustomEvent("giveRequest"));
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
}