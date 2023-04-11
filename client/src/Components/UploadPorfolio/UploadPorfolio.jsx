import React, { useState, useRef } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material";
import { display } from "@mui/system";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          "&.Mui-focused": {
            color: "#5A5252",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-outlined.Mui-focused + .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#5A5252",
            },
          "&:hover .MuiInputLabel-outlined.Mui-focused + .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#5A5252",
            },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5A5252",
          },
        },
      },
    },
  },
});

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
  userId,
  setFlag,
  flag,
}) => {
  const id = localStorage.getItem("userId");
  const s3 = new AWS.S3();
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [ageRange, setAgeRange] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [concern, setConcern] = useState("");
  const [procedure, setProcedure] = useState("");
  const [save, setSave] = useState(false);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const portfolioSend = (body) => {
    console.log(body);
    let profileId = id;
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
        setFlag(!flag);
      })
      .catch((errors) => console.log(errors));
  };

  const handleSave = () => {
    portfolioSend({
      userId: id,
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
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginRight: "16px",
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            {!file && (
              <div
                onClick={handleButtonClick}
                style={{
                  fontSize: "12px",
                  margin: "2px",
                  padding: "1px",
                  width: "70px",
                  backgroundColor: "#5A5252",
                  // color: "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                  userSelect: "none",
                  display: "inline-block",
                  color: "#FFFFFF",
                  bgcolor: "#5A5252",
                  "&:hover": {
                    bgcolor: "#FFFFFF",
                    color: "#5A5252",
                  },
                }}
              >
                Choose File
              </div>
            )}
            <Button
              onClick={uploadToS3}
              sx={{
                fontFamily: "Playfair Display",
                width: { xs: "100%", md: "66.7%" },
                height: "25px",
                minWidth: "125px",
                border: "2px solid #5A5252",
                fontFamily: "Playfair Display",
                textTransform: "none",
                color: "#FFFFFF",
                bgcolor: "#5A5252",
                "&:hover": {
                  bgcolor: "#FFFFFF",
                  color: "#5A5252",
                },
              }}
            >
              Upload
            </Button>
            <Paper variant="outlined" spacing="4" sx={{ border: "none" }}>
              <img src={imageUrl} height="150" width="150" />
            </Paper>
          </div>
          <div>
            <Stack spacing={2}>
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
                  <MenuItem value={"Lips Contouring"}>Lips Contouring</MenuItem>
                  <MenuItem value={"Body Hair Management"}>
                    Body Hair Management
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
            {imageUrl && (
              <Button
                onClick={() => handleSave()}
                sx={{
                  fontFamily: "Playfair Display",
                  width: { xs: "100%", md: "66.7%" },
                  height: "25px",
                  minWidth: "125px",
                  border: "2px solid #5A5252",
                  fontFamily: "Playfair Display",
                  textTransform: "none",
                  color: "#FFFFFF",
                  bgcolor: "#5A5252",
                  "&:hover": {
                    bgcolor: "#FFFFFF",
                    color: "#5A5252",
                  },
                }}
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default ImageUploaderPortfolio;
