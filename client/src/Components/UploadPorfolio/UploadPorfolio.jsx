import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { Button, Paper, Typography, Card, Stack } from "@mui/material";
import { display } from "@mui/system";
AWS.config.update({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_ACCESS_SECRET_KEY,
  region: "us-east-1",
  signatureVersion: "v4",
});

const ImageUploaderPortfolio = ({ portfolioPhotos, setPortfolioPhotos }) => {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setPortfolioPhotos([...portfolioPhotos, imageUrl]);
  }, [imageUrl]);
  useEffect(() => {}, [setPortfolioPhotos]);

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

    console.log("uploading to s3", Location);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack>
        <input type="file" onChange={handleFileSelect} />
        {file && (
          <div style={{ marginTop: "10px" }}>
            <Button onClick={uploadToS3}>Upload</Button>
          </div>
        )}
        <Paper variant="outlined">
          <img src={imageUrl} height="150" width="150" />
        </Paper>
      </Stack>
      {/* {imageUrl && (
		  <div style={{ marginTop: "10px" }}>
          <img src={imageUrl} alt="uploaded" />
		  </div>
		)} */}
    </div>
  );
};

export default ImageUploaderPortfolio;
