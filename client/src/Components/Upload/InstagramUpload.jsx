import React from "react";
import { useState } from "react";

function InstagramUpload() {
  const [accessToken, setAccessToken] = useState('');

  const handleAuth = () => {
    const clientId = '906807220437098';
    const redirectUri = 'https://localhost:5173/dashboard/edit';
    const scope = 'user_profile,user_media';
    const responseType = 'code'
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    window.location.href = authUrl;
  };

  const handleRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    const clientId = '906807220437098';
    const clientSecret = 'ffef31e87ad697ded0a991618b808b6d';
    const redirectUri = 'https://localhost:5173/dashboard/edit';
    const tokenUrl = 'https://api.instagram.com/oauth/access_token';
    const requestBody = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: authCode,
    });
    console.log("WORK HEREEEEEEEEEEEEEEEEEEEEEEEEEEEE")

    fetch(tokenUrl, {
      method: 'POST',
      body: requestBody,
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.access_token;
        setAccessToken(token);
        console.log(data.access_token, "here///")
        console.log(token)
      })
  };

  return (
    <div>
      <button onClick={handleAuth}>Instagram</button>
    </div>
  );
}
export default InstagramUpload;