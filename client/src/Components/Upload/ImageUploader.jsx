import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { Button } from "@mui/material";
AWS.config.update({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_ACCESS_SECRET_KEY,
  region: "us-east-1",
  signatureVersion: "v4",
});

const ImageUploader = ({
  editProfilePicture,
  setEditProfilePicture,
  setProfilePicture,
}) => {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const portfolioSend = (body) => {
    console.log(body);
    let profileId = "642b251e5fce23fc3b4068de";
    fetch(`http://localhost:4000/routes/updateProfile/${profileId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // TODO: set response to display images?
        // call setIsOpen(false)?
        console.log(data);
      })
      .catch((errors) => console.log(errors));
  };

  useEffect(() => {
    setProfilePicture(imageUrl);
  }, [imageUrl]);

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
    console.log("Location", Location);
    setImageUrl(Location);
    // setProfilePicture(Location);
    console.log(editProfilePicture);

    // if (editProfilePicture === true) {
    //   console.log(imageUrl);
    // }
    console.log("uploading to s3", Location);
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: "10px" }}>
          <Button onClick={uploadToS3}>Upload</Button>
        </div>
      )}
      <Button> Save</Button>
    </div>
  );
};

export default ImageUploader;
