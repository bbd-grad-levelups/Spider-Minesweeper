const logInOauth = () => {
  const clientId = 'Iv1.2ade9f2605804190';
  const clientSecret = '33296377811069e297b79cd0deb2d1526e4bca88';
  const redirectUri = 'http://127.0.0.1:5501/Front%20end/index.html?page=logIn-page'; // Update with your redirect URI
  const scope = 'user';

  console.log("in loginOAUTH")
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  // function authorize() {
  //   window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  // }

  // authorize();

  // async function exchangeCodeForToken(code) {
  // const response = await fetch('https://github.com/login/oauth/access_token', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //         client_id: clientId,
  //         client_secret: clientSecret,
  //         code: code,
  //         redirect_uri: redirectUri
  //     })
  // });
  // const data = await response.json();
  // if (data.error) {
  //     throw new Error(data.error_description || 'Failed to exchange code for token');
  // }
  // return data.access_token;
  // }

  // async function getUserData(accessToken) {
  // const response = await fetch('https://api.github.com/user', {
  //     headers: {
  //         Authorization: `Bearer ${accessToken}`
  //     }
  // });
  // if (!response.ok) {
  //     throw new Error('Failed to fetch user data');
  // }
  // return response.json();
  // }

  // async function generateJWT(code) {
  // const accessToken = await exchangeCodeForToken(code);
  // const userData = await getUserData(accessToken);

  // const jwt = jose.JWT.sign({
  //     sub: userData.login,
  //     exp: Math.floor(Date.now() / 1000) + 3600
  // }, clientSecret, {
  //     algorithm: 'RS256'
  // });

  // console.log('JWT:', jwt);
  // }

  // const urlParams = new URLSearchParams(window.location.search);
  // const code = urlParams.get('code');

  // if (code) {
  // generateJWT(code)
  //     .catch(error => console.error('Error generating JWT:', error));
  // }

}

function myFunction() {
  alert('Button clicked!');
}


// document.getElementById('login-button').addEventListener('click', myFunction);
// document.addEventListener("logInOauth", logInOauth);
// document.addEventListener("logIn", logIn);
