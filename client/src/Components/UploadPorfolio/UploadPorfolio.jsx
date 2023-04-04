import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import {
  Button,
  Paper,
  Typography,
  Card,
  Stack,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { display } from "@mui/system";
AWS.config.update({
  accessKeyId: import.meta.env.VITE_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_ACCESS_SECRET_KEY,
  region: "us-east-1",
  signatureVersion: "v4",
});

const ImageUploaderPortfolio = ({
  portfolioPhotos,
  setPortfolioPhotos,
  setIsOpen,
}) => {
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [ageRange, setAgeRange] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [concern, setConcern] = useState("");
  const [procedure, setProcedure] = useState("");
  const [save, setSave] = useState(false);

  const portfolioSend = (body) => {
    console.log(body);
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
        // TODO: set response to display images?
        // call setIsOpen(false)?
        setIsOpen(false);
        console.log(data);
      })
      .catch((errors) => console.log(errors));
  };

  const handleSave = () => {
    portfolioSend({
      userId: "642c4208b731d3e2f98f1fee",
      imageLinks: imageUrl,
      ageRange: ageRange,
      pronoun: pronoun,
      concern: concern,
      procedure: procedure,
    });
    // TODO: only call this if there is a successful response - might need to move to portfolioSend()
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadToS3 = async () => {
    if (!file) {
      // TODO if unsuccessful add failure message
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

  const handleChangeAgeRange = (event) => {
    setAgeRange(event.target.value);
  };
  const handleChangePronoun = (event) => {
    setPronoun(event.target.value);
  };
  const handleChangeConcern = (event) => {
    setConcern(event.target.value);
  };
  const handleChangeProcedure = (event) => {
    setProcedure(event.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2}>
        <input type="file" onChange={handleFileSelect} />
        {file && (
          <div style={{ marginTop: "10px" }}>
            <Button onClick={uploadToS3}>Upload</Button>
          </div>
        )}
        <Paper variant="outlined" space="4">
          <img src={imageUrl} height="150" width="150" />
        </Paper>
        {/* <FormControl> */}
        <Stack spacing="2">
          <FormControl>
            <InputLabel>Age Range</InputLabel>
            <Select
              value={ageRange}
              label="Age Range"
              onChange={handleChangeAgeRange}
              size="medium"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"21 - 25"}>21-25</MenuItem>
              <MenuItem value={"26 - 35"}>26-35</MenuItem>
              <MenuItem value={"36 - 45"}>35-45</MenuItem>
              <MenuItem value={"46 - 55"}>46-55</MenuItem>
              <MenuItem value={"56+"}>56+</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Pronoun</InputLabel>
            <Select
              value={pronoun}
              label="Pronoun"
              onChange={handleChangePronoun}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"she / her"}>she/her</MenuItem>
              <MenuItem value={"he / him"}>he/him</MenuItem>
              <MenuItem value={"they / them"}>they/them</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Concern</InputLabel>
            <Select
              value={concern}
              label="Concern"
              onChange={handleChangeConcern}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"General Anti-aging"}>
                General Anti-aging
              </MenuItem>
              <MenuItem value={"Wrinkle Correction"}>
                Wrinkle Correction
              </MenuItem>
              <MenuItem value={"Skin Laxity"}>Skin Laxity</MenuItem>
              <MenuItem value={"Body Sculpting"}> Body Sculpting</MenuItem>
              <MenuItem value={"Acne"}>Acne</MenuItem>
              <MenuItem value={"Skin Pigment & Texture"}>
                Skin Pigment & Texture
              </MenuItem>
              <MenuItem value={"Face Contouring"}>Face Contouring</MenuItem>
              <MenuItem value={"Lips Contouring, Body Hair Management"}>
                Lips Contouring, Body Hair Management
              </MenuItem>
              <MenuItem value={"Special Occasion Prep"}>
                Special Occasion Prep
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Procedure</InputLabel>
            <Select
              value={procedure}
              label="Concern"
              onChange={handleChangeProcedure}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Botulinum Toxin"}>Botulinum Toxin</MenuItem>
              <MenuItem value={"Dermal Filler"}>Dermal Filler</MenuItem>
              <MenuItem value={"Laser Skin Treatment"}>
                Laser Skin Treatment
              </MenuItem>
              <MenuItem value={"Laser Hair Removal"}>
                {" "}
                Laser Hair Removal
              </MenuItem>
              <MenuItem value={"Light Treatment"}>Light Treatment</MenuItem>
              <MenuItem value={"Chemical Peel"}>Chemical Peel</MenuItem>
              <MenuItem value={"Microneedling"}>Microneedling</MenuItem>
              <MenuItem value={"Device-based Facial"}>
                Device-based Facial
              </MenuItem>
              <MenuItem value={"Non surgical Fat Reduction"}>
                Non surgical Fat Reduction
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {imageUrl && <Button onClick={() => handleSave()}>Save</Button>}
      </Stack>
    </div>
  );
};

export default ImageUploaderPortfolio;
