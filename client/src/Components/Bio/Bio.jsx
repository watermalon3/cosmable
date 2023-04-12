import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Avatar,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Paper,
  ListItem,
} from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ButtonAppBar from "../Create/header/HeaderNav";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
const Bio = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [ageRange, setAgeRange] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [concern, setConcern] = useState("");
  const [procedure, setProcedure] = useState("");
  const [displayedPortfolios, setDisplayedPortfolios] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  // const [id, setId] = useState(userId);
  const id = localStorage.getItem("userId");
  const handleChangeAgeRange = (event) => {
    setAgeRange(event.target.value);
    if (!event.target.value) {
      delete filterOptions.ageRange;
    } else {
      setFilterOptions({ ...filterOptions, ageRange: event.target.value });
    }
  };
  const handleChangePronoun = (event) => {
    setPronoun(event.target.value);
    if (!event.target.value) {
      delete filterOptions.pronoun;
    } else {
      setFilterOptions({ ...filterOptions, pronoun: event.target.value });
    }
  };
  const handleChangeConcern = (event) => {
    setConcern(event.target.value);
    if (!event.target.value) {
      delete filterOptions.concern;
    } else {
      setFilterOptions({ ...filterOptions, concern: event.target.value });
    }
  };
  const handleChangeProcedure = (event) => {
    setProcedure(event.target.value);
    if (!event.target.value) {
      delete filterOptions.procedure;
    } else {
      setFilterOptions({ ...filterOptions, procedure: event.target.value });
    }
  };
  useEffect(() => {
    Promise.all([getPortfolio(id), getUser(id), getProfile(id)]).then(
      (values) => {
        // console.log("return values 0", values[0], "return values 1", values[1]);
        setPortfolio(values[0]);
        setUser(values[1]);
        setProfile(values[2]);
        setIsLoading(false);
      }
    );
  }, []);

  const filterPortfolios = () => {
    return portfolio.foundPortfolio
      .filter((obj) => {
        console.log(obj);
        for (let key in filterOptions) {
          if (obj[key] !== filterOptions[key]) {
            console.log("inside of if statement");
            console.log(obj[key], filterOptions[key]);
            return false;
          }
        }
        return true;
      })
      .map((image) => {
        return (
          <ImageListItem key={image._id}>
            <img
              src={`${image.imageLinks}?w=164&h=164&fit=crop&auto=format`}
              alt={image.title}
              loading="lazy"
              style={{
                objectFit: "cover", // Adjust how the image fills its container
                width: "100%", // Set the width of the image to 100% of the container
                height: "100%", // Set the height of the image to 100% of the container
              }}
            />
            {/* <ImageListItemBar title={image.title} /> */}
          </ImageListItem>
        );
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {isLoading ? (
          <Typography variant="h1"> Loading</Typography>
        ) : (
          <div>
            <ButtonAppBar isHomePage={false} className="AppBar-transparent" />
            <Paper
              sx={{
                overflow: "hidden",
                borderRadius: "15px",
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                zIndex: 1,
                padding: "20px",
                margin: "auto",
                maxWidth: "630px",
                marginTop: "100px",
                paddingBottom: "50px",
                "@media (max-width: 600px)": {
                  maxWidth: "100%", // set the maximum width to 100% on small screens
                  margin: "0px", // remove margin on small screens
                  marginTop: "70px", // adjust the top margin on small screens
                  paddingTop: "30px", // adjust the top padding on small screens
                  paddingBottom: "100px", // adjust the bottom padding on small screens
                },
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  textAlign: "center",
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
                  {user.user.name}, {user.user.title}
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
                  {user.user.city}
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
                              sx={{
                                fontFamily: "Playfair Display",
                                fontSize: "16px",
                                lineHeight: "20px",
                                color: "#5A5252",
                                bgcolor: "#FFFFFF",
                                "&:hover": {
                                  bgcolor: "#5A5252",
                                  color: "#FFFFFF",
                                },
                              }}
                            >
                              {item.linkName}
                            </Button>
                          );
                        }
                      })}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
                <Stack
                  direction={{ xs: "row", md: "row" }}
                  justifyContent={"space-between"}
                  spacing={{ xs: 1, sm: 1, md: 1 }}
                >
                  <FormControl
                    sx={{
                      width: { xs: "100", md: "250" },
                      mb: 2,
                      "@media (max-width: 600px)": {
                        justifyContent: "space-evenly",
                      },
                    }}
                  >
                    <InputLabel>Age</InputLabel>
                    <Select
                      IconComponent={null}
                      value={ageRange}
                      label="Age Range"
                      onChange={handleChangeAgeRange}
                      size="small"
                      sx={{
                        color: "#5A5252",
                        fontFamily: "Playfair Display",
                        textTransform: "none",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        borderRadius: "5px",
                        padding: "8px 16px",
                        borderColor: "#5A5252",
                      }}
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
                  <FormControl
                    sx={{
                      width: { xs: "100", md: "250" },
                      marginRight: { md: "16px" },
                      mb: 2,
                    }}
                  >
                    <InputLabel>Pronoun</InputLabel>
                    <Select
                      IconComponent={null}
                      value={pronoun}
                      label="Pronoun"
                      onChange={handleChangePronoun}
                      size="small"
                      sx={{
                        color: "#5A5252",
                        fontFamily: "Playfair Display",
                        textTransform: "none",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        borderRadius: "5px",
                        borderColor: "#5A5252",
                        padding: "8px 16px",
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"she / her"}>she/her</MenuItem>
                      <MenuItem value={"he / him"}>he/him</MenuItem>
                      <MenuItem value={"they / them"}>they/them</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      width: { xs: "100", md: "250" },
                      marginRight: { md: "16px" },
                      mb: 2,
                    }}
                  >
                    <InputLabel>Concern</InputLabel>
                    <Select
                      IconComponent={null}
                      value={concern}
                      label="Concern"
                      onChange={handleChangeConcern}
                      size="small"
                      sx={{
                        color: "#5A5252",
                        fontFamily: "Playfair Display",
                        textTransform: "none",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        borderRadius: "5px",
                        borderColor: "#5A5252",
                        padding: "8px 16px",
                      }}
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
                      <MenuItem value={"Body Sculpting"}>
                        {" "}
                        Body Sculpting
                      </MenuItem>
                      <MenuItem value={"Acne"}>Acne</MenuItem>
                      <MenuItem value={"Skin Pigment & Texture"}>
                        Skin Pigment & Texture
                      </MenuItem>
                      <MenuItem value={"Face Contouring"}>
                        Face Contouring
                      </MenuItem>
                      <MenuItem value={"Lips Contouring"}>
                        Lips Contouring
                      </MenuItem>
                      <MenuItem value={"Body Hair Management"}>
                        Body Hair Management
                      </MenuItem>
                      <MenuItem value={"Special Occasion Prep"}>
                        Special Occasion Prep
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      width: { xs: "100", md: "250" },
                      marginRight: { md: "16px" },
                      mb: 2,
                    }}
                  >
                    <InputLabel>Procedure</InputLabel>
                    <Select
                      IconComponent={null}
                      value={concern}
                      label="Concern"
                      onChange={handleChangeConcern}
                      size="small"
                      sx={{
                        color: "#5A5252",
                        fontFamily: "Playfair Display",
                        textTransform: "none",
                        fontSize: "16px",
                        lineHeight: "20px",
                        fontWeight: 400,
                        borderRadius: "5px",
                        borderColor: "#5A5252",
                        padding: "8px 16px",
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Botulinum Toxin"}>
                        Botulinum Toxin
                      </MenuItem>
                      <MenuItem value={"Dermal Filler"}>Dermal Filler</MenuItem>
                      <MenuItem value={"Laser Skin Treatment"}>
                        Laser Skin Treatment
                      </MenuItem>
                      <MenuItem value={"Laser Hair Removal"}>
                        {" "}
                        Laser Hair Removal
                      </MenuItem>
                      <MenuItem value={"Light Treatment"}>
                        Light Treatment
                      </MenuItem>
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
                  sx={{
                    width: 500,
                    height: 450,
                    "@media (max-width: 600px)": {
                      width: "100%", // set the width to 100% on small screens
                      height: "auto", // adjust the height on small screens
                      padding: "0px", // remove padding on small screens
                    },
                  }}
                  cols={3}
                  rowHeight={164}
                  gap={4}
                >
                  {filterPortfolios()}
                </ImageList>
              </Stack>
            </Paper>
          </div>
        )}
      </>
    </ThemeProvider>
  );
};
export default Bio;
