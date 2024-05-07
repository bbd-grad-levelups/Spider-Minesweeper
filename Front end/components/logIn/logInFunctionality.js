const clientId = '';
const clientSecret = '';
const redirectUri = '';
const scope = 'user';

function authorize() {
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
}

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');

if (code) {
  // Send code to backend
  fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
}
