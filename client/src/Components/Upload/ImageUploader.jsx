import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { Button, Stack } from "@mui/material";
AWS.config.update({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_ACCESS_SECRET_KEY,
  region: "us-east-1",
  signatureVersion: "v4",
});

const ImageUploader = ({ setProfilePicture, userId }) => {
  const s3 = new AWS.S3();
  const id = localStorage.getItem("userId");
  const [file, setFile] = useState(null);

  const portfolioSend = (body) => {
    console.log(body);
    let profileId = id;
    fetch(`http://localhost:4000/routes/updateUser/${profileId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfilePicture(body.profilePicture);
        console.log(data);
      })
      .catch((errors) => console.log(errors));
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: import.meta.env.VITE_AWS_BUCKET,
      Key: `${Date.now()}.${file.name}`,
      Body: file,
    };
    const { Location } = await s3.upload(params).promise();
    portfolioSend({
      profilePicture: Location,
    });
  };

  useEffect(() => {
    if (file) {
      uploadToS3();
    }
  }, [file]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        id="photo-upload-input"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <label htmlFor="photo-upload-input">
        <Button component="span" variant="contained" color="primary"
        sx={{
          fontFamily: "Playfair Display",
          backgroundColor: "#5A5252",
          color: "#fff",
          height: "40px",
          padding: "2px",
          width: "120px",
          textTransform: "none",
          paddingTop: "1"
        }}>
          Select Photo
        </Button>
      </label>
    </>
  );
};

export default ImageUploader;
