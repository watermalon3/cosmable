import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ButtonAppBar from "../Create/header/HeaderNav";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Stack,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  Drawer,
  Paper,
  Avatar,
  ImageList,
  ImageListItem,
  Box,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ImageUploader from "../Upload/ImageUploader";
import ImageUploaderPortfolio from "../UploadPorfolio/UploadPorfolio";

const getUser = async (userId) => {
  const url = `http://localhost:4000/routes/user/${userId}`;
  const response = await fetch(url);
  const user = response.json();
  if (!response.ok) {
    throw new Error("user could not be found");
  }
  console.log("here 1");
  // TODO check for error
  return user;
};
const getProfile = async (userId) => {
  const url = `http://localhost:4000/routes/profile/${userId}`;
  const response = await fetch(url);
  const profile = response.json();
  // TODO check for error
  if (!response.ok) {
    throw new Error("Profile could not be found");
  }
  console.log("here 2");
  return profile;
};
const getPortfolio = async (userId) => {
  const url = `http://localhost:4000/routes/portfolio/${userId}`;
  const response = await fetch(url);
  const portfolio = response.json();
  // TODO check for error
  if (!response.ok) {
    throw new Error("Portfolio could not be found");
  }
  console.log("here 3");
  return portfolio;
};
const updateProfile = async (userId, body) => {
  console.log("body", body);
  const sendBody = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: new Headers({
      "content-Type": "application/json",
    }),
  };
  const url = `http://localhost:4000/routes/updateProfile/${userId}`;
  const response = await fetch(url, sendBody);
  const updateProfile = response.json();
  return updateProfile;
};

const deleteImage = async (userId) => {
  const sendBody = {
    method: "DELETE",
  };
  const url = `http://localhost:4000/routes/deleteimage/${userId}`;
  const response = await fetch(url, sendBody);
  const deletePorfolio = response.json();
  return deletePorfolio;
};

const EditBio = ({ userId }) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [portfolioPhotos, setPortfolioPhotos] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [profile, setProfile] = useState(null);
  const [update, setUpdate] = useState(null);
  const [flag, setFlag] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    Promise.all([getPortfolio(id), getUser(id), getProfile(id)]).then(
      (values) => {
        // console.log("return values 0", values[0], "return values 1", values[1]);
        setPortfolio(values[0]);
        setUser(values[1]);
        setProfile(values[2]);
        setIsLoading(false);
        if (values[2].foundProfile.bio) {
          setValue("bio", values[2].foundProfile.bio);
        }
        if (values[2].foundProfile.links[0]) {
          setValue("linkName1", values[2].foundProfile.links[0].linkName);
          setValue("link1", values[2].foundProfile.links[0].link);
          console.log(values[2].foundProfile.links[0].linkName);
        }
        if (values[2].foundProfile.links[1]) {
          setValue("linkName2", values[2].foundProfile.links[1].linkName);
          setValue("link2", values[2].foundProfile.links[1].link);
        }
        if (values[2].foundProfile.links[2]) {
          setValue("linkName3", values[2].foundProfile.links[2].linkName);
          setValue("link3", values[2].foundProfile.links[2].link);
        }
      }
    );
  }, [flag]);
  useEffect(() => {
    console.log("update", update);
    if (update) {
      updateProfile(id, update).then((data) => {
        console.log("data2", data.message);
        if (data.message === "profile successfully updated") {
          console.log("hit");
          navigate("/dashboard");
        }
      });
    }

    // console.log("user", user);
    // console.log("portfolio", portfolio);
    // console.log("profile", profile);
  }, [update]);
  const onSubmit = async (data) => {
    console.log("data", data);
    setUpdate({
      bio: data.bio,
      links: [
        {
          linkName: data.linkName1,
          link: data.link1,
        },
        {
          linkName: data.linkName2,
          link: data.link2,
        },
        {
          linkName: data.linkName3,
          link: data.link3,
        },
      ],
    });
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteImage(id);
    setFlag(!flag);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Paper
      elevation={3}
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
        '@media (max-width: 600px)': {
          maxWidth: '100%', // set the maximum width to 100% on small screens
          margin: '0px', // remove margin on small screens
          marginTop: '70px', // adjust the top margin on small screens
          paddingTop: '30px', // adjust the top padding on small screens
          paddingBottom: '100px' // adjust the bottom padding on small screens
        }
      }}
      style={{
        overflow: "hidden",
      }}

    >
      <>
        {isLoading ? (
          <Typography variant="h1"> Loading</Typography>
        ) : (
          <>
            <ButtonAppBar isHomePage={false} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    src={user.user.profilePicture || profilePicture}
                  />
                  <ImageUploader
                    setProfilePicture={setProfilePicture}
                    userId={userId}
                  />

                  <Typography variant="h6" fontFamily="Playfair Display">
                    {user.user.name}, {user.user.title}
                  </Typography>
                  <Typography variant="h6" fontFamily="Playfair Display">{user.user.city}</Typography>
                </div>
                <TextField
                  fullWidth
                  label="+ Add bio"
                  {...register("bio")}
                  //   errors={Boolean(errors.bio)}
                  //   helperText={errors.bio?.message}
                />
                {/* Add Link */}
                <TextField
                  label="+ name"
                  id="linkName1"
                  {...register("linkName1")}
                  //   error={Boolean(errors.link)}
                  //   helperText={errors.link?.message}
                />
                <TextField
                  label="+ Add link"
                  {...register("link1")}
                  //   error={Boolean(errors.link)}
                  //   helperText={errors.link?.message}
                />
                <TextField
                  label="+ name"
                  {...register("linkName2")}
                  //   error={Boolean(errors.link)}
                  //   helperText={errors.link?.message}
                />
                <TextField
                  label="+ Add link"
                  {...register("link2")}
                  //   error={Boolean(errors.link)}
                  //   helperText={errors.link?.message}
                />
                <TextField
                  label="+ name"
                  {...register("linkName3")}
                  //   error={Boolean(errors.link)}
                  //   helperText={errors.link?.message}
                />
                <TextField
                  label="+ Add link"
                  id="link3"
                  {...register("link3")}
                  //   error={Boolean(errors.link)}
                  //   helperText={errors.link?.message}
                />
                <Typography
                variant="h4"
                fontFamily="Playfair Display"
                >Portfolio</Typography>
                <ImageList
                sx={{ width: "100%", height: "auto", margin: "auto" }}
                  cols={3}
                  rowHeight={164}
                >
                  {portfolio.foundPortfolio.map((item) => {
                    console.log("item", item);
                    return (
                      <ImageListItem>
                        <IconButton onClick={() => handleDelete(item._id)}>
                          <ClearIcon />
                        </IconButton>
                        <img
                          src={`${item.imageLinks}?w=164&h=164&fit=crop&auto=format`}
                        />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
                <Button variant="contained"
                color="success"
                sx={{
                  display: "flex",
                  fontFamily: "Playfair Display",
                  backgroundColor: "#5A5252",
                  color: "#fff",
                  height: "40px",
                  padding: "2px",
                  width: "150px",
                  textTransform: "none",
                }}

                 onClick={() => setIsOpen(true)}>
                  Update Portfolio
                </Button>
                {/* Build Your Portfolio */}
                <Button
                color="primary"
                variant="contained"
                type="submit"
                style={{ marginTop: 16 }}
                sx={{
                  fontFamily: "Playfair Display",
                  backgroundColor: "#5A5252",
                  color: "#fff",
                  height: "40px",
                  padding: "2px",
                  width: "150px",
                  textTransform: "none",
                }}

                >
                  Save Changes
                </Button>
              </Stack>
            </form>
            <Drawer
              anchor="bottom"
              // position="bottom"
              open={isOpen}
              onClose={() => handleClose()}
              PaperProps={{ sx:  {color: "#333", height: "fit-content", maxWidth: "85vw", mx: "auto", boxShadow: "0px -4px 16px rgba(0, 0, 0, 0.1)",
            }  }}
              sx={{ "& .MuiDrawer-paper": { borderRadius: "10px 10px 0 0" } }}

            >
              <Box  sx={{ px: 2, py: 4, fontFamily: "Playfair Display" }}>
              
                <Typography>Portfolio</Typography>
                <ImageUploaderPortfolio
                  portfolioPhotos={portfolioPhotos}
                  setPortfolioPhotos={setPortfolioPhotos}
                  setIsOpen={setIsOpen}
                  userId={userId}
                  setFlag={setFlag}
                  flag={flag}
                />
              </Box>
            </Drawer>
          </>
        )}
      </>
    </Paper>
  );
};
export default EditBio;
