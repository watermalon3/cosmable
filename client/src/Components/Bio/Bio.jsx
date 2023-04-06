import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Avatar,
  Button,
  ImageList,
  ImageListItem,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ButtonAppBar from "../Create/header/HeaderNav";

const getUser = async (userId) => {
  const url = `http://localhost:4000/routes/user/${userId}`;
  const response = await fetch(url);

  const user = response.json();
  if (!response.ok) {
    throw new Error("user could not be found");
  }
  // TODO check for error
  return user;
};
const getProfile = async (userId) => {
  const url = `http://localhost:4000/routes/profile/${userId}`;
  const response = await fetch(url);
  const profile = response.json();
  // TODO check for error
  return profile;
};
const getPortfolio = async (userId) => {
  const url = `http://localhost:4000/routes/portfolio/${userId}`;
  const response = await fetch(url);
  const portfolio = response.json();
  // TODO check for error
  return portfolio;
};
const Bio = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [ageRange, setAgeRange] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [concern, setConcern] = useState("");
  const [procedure, setProcedure] = useState("");

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
  useEffect(() => {
    Promise.all([
      getPortfolio("642c4208b731d3e2f98f1fee"),
      getUser("642c4208b731d3e2f98f1fee"),
      getProfile("642c4208b731d3e2f98f1fee"),
    ]).then((values) => {
      // console.log("return values 0", values[0], "return values 1", values[1]);
      setPortfolio(values[0]);
      setUser(values[1]);
      setProfile(values[2]);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <Typography variant="h1"> Loading</Typography>
      ) : (
        <div>
          <ButtonAppBar isHomePage={false} className="AppBar-transparent" />
          <Stack
            spacing={2}
            sx={{
              textAlign: "center",
              paddingTop: "70px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#5A5252",
            }}
          >
            <IconButton
              component={Link}
              to="/dashboard/edit"
              sx={{ alignSelf: "end" }}
            >
              <EditIcon />
            </IconButton>
            <Avatar
              src={user.user.profilePicture}
              sx={{ width: 150, height: 150, margin: "auto" }}
            />
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Playfair Display",
                fontWeight: 400,
                fontSize: "30px",
                lineHeight: "39.99px",
                color: "#5A5252",
              }}
            >
              UserName
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Playfair Display",
                fontSize: "18px",
                lineHeight: "22px",
                color: "#9B9B9B",
              }}
            >
              Location
            </Typography>
            <Accordion sx={{ width: "75%", margin: "auto" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Playfair Display",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",

                    color: "#5A5252",
                  }}
                >
                  bio
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Playfair Display",
                    fontSize: "18px",
                    lineHeight: "22px",
                    color: "#5A5252",
                  }}
                >
                  {profile.foundProfile.bio}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: "75%", margin: "auto" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Playfair Display",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#5A5252",
                  }}
                >
                  Links
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  {profile.foundProfile.links.map((item) => {
                    if (item.linkName) {
                      return (
                        <Button
                          target="_blank"
                          href={item.link}
                          variant="contained"
                        >
                          {item.linkName}
                        </Button>
                      );
                    }
                  })}
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Stack direction={"row"} spacing={3}>
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
            <ImageList
              sx={{ width: 500, height: 450 }}
              cols={3}
              rowHeight={164}
            >
              {portfolio.foundPortfolio.map((item) => {
                console.log("item", item);
                return (
                  <ImageListItem>
                    <img
                      src={`${item.imageLinks}?w=164&h=164&fit=crop&auto=format`}
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Stack>
        </div>
      )}
    </>
  );
};

export default Bio;
