import AWS from "aws-sdk";
import { useState } from "react";
AWS.config.update({
  accessKeyId: "AKIAWEVK55ISCRTPIXFB",
  secretAccessKey: "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",
  region: "us-east-1",
  signatureVersion: "v4",
});

const ImageUploader = () => {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: "cosmable",
      Key: `${Date.now()}.${file.name}`,
      Body: file,
    };
    const { Location } = await s3.upload(params).promise();
    setImageUrl(Location);
    console.log("uploading to s3", Location);
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <input type="file" onChange={handleFileSelect} />
      {file && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={uploadToS3}>Upload</button>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: "10px" }}>
          <img src={imageUrl} alt="uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
