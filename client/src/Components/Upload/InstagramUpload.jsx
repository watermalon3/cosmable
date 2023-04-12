import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import CheckIcon from "@mui/icons-material/Check";
import ImageUploaderPortfolio from "../UploadPorfolio/UploadPorfolio";

function InstagramUpload({ setFlag, flag }) {
  const id = localStorage.getItem("userId");
  const [accessToken, setAccessToken] = useState("");
  const [mediaData, setMediaData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [body, setBody] = useState({});

  const handleAuth = () => {
    const clientId = "1290279568592354";
    const redirectUri =
      "https://39b2-65-183-128-17.ngrok-free.app/dashboard/edit";
    const scope = "user_profile,user_media";
    const responseType = "code";
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

    window.location.href = authUrl;
  };

  const handleRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      const clientId = "1290279568592354";
      const clientSecret = "fa9efc820e9cd87d94f707b785eeb188";
      const redirectUri =
        "https://39b2-65-183-128-17.ngrok-free.app/dashboard/edit";
      const tokenUrl = "https://api.instagram.com/oauth/access_token";
      const requestBody = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        code: authCode,
      });

      fetch(tokenUrl, {
        method: "POST",
        body: requestBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const token = data.access_token;
          setAccessToken(token);
          localStorage.setItem("token", token);
          setShowModal(true);
        });
    }
  };

  const handleFetchMedia = () => {
    const mediaUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;

    fetch(mediaUrl)
      .then((res) => res.json())
      .then((data) => {
        setMediaData(data.data);
      });
  };

  const handleSelectMedia = (media) => {
    const index = selectedMedia.indexOf(media);
    if (index === -1) {
      setSelectedMedia([...selectedMedia, media]);
    } else {
      const updatedSelectedMedia = [...selectedMedia];
      updatedSelectedMedia.splice(index, 1);
      setSelectedMedia(updatedSelectedMedia);
    }
  };
  useEffect(() => {
    if (selectedMedia.length >= 1) {
      console.log(selectedMedia);
      setBody({
        userId: id,
        imageLinks: `${selectedMedia[0].media_url}&=${accessToken}`,
        ageRange: selectedMedia[0].permalink,
      });

      console.log(selectedMedia[0].media_url);
    }
  }, [selectedMedia]);
  const Upload = async (body) => {
    console.log(body);
    // console.log(portfolio)
    // setPortfolio([[...portfolio, body]])
    let profileId = "642c4208b731d3e2f98f1fee";
    fetch(`http://localhost:4000/routes/createportfolio`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFlag(!flag);
        setShowModal(false);
        console.log(data);
      })
      .catch((errors) => console.log(errors));
  };
  const handleUpload = async () => {
    Upload(body);
    // <ImageUploaderPortfolio selectedMedia={selectedMedia} />
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div>
      <Dialog open={showModal} maxWidth="30vw">
        <DialogTitle>Select Pictures</DialogTitle>
        <DialogContent>
          {mediaData.map((media) => (
            <div
              key={media.id}
              onClick={() => handleSelectMedia(media)}
              style={{
                position: "relative",
                cursor: "pointer",
              }}
            >
              <img
                src={media.media_url}
                alt={media.caption}
                style={{
                  filter: selectedMedia.includes(media)
                    ? "grayscale(90%)"
                    : "none",
                  width: "400px",
                  height: "400px",
                  flexDirection: "row",
                  spaceBetween: "10px",
                }}
              />
              {selectedMedia.includes(media) && (
                <CheckIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "green",
                    borderRadius: "50%",
                    padding: "2px",
                    fontSize: "100px",
                  }}
                />
              )}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Close</Button>
          <Button onClick={handleFetchMedia}>Select Pictures</Button>
          <Button onClick={handleUpload}>Upload Pictures</Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        color="success"
        sx={{
          display: "flex",
          fontFamily: "Playfair Display",
          backgroundColor: "#5A5252",
          height: "40px",
          padding: "2px",
          width: "150px",
          textTransform: "none",
          border: "2px solid #5A5252",
          color: "#FFFFFF",
          bgcolor: "#5A5252",
          "&:hover": {
            bgcolor: "#FFFFFF",
            color: "#5A5252",
          },
        }}
        onClick={handleAuth}
      >
        Upload From <InstagramIcon />
      </Button>
    </div>
  );
}
export default InstagramUpload;
