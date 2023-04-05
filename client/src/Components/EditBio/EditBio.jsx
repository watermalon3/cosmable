import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import ImageUploader from "../Upload/ImageUploader";
import ImageUploaderPortfolio from "../UploadPorfolio/UploadPorfolio";

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
const updateProfile = async (userId, body) => {
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
const EditBio = () => {
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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
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
      if (values[2].foundProfile.bio) {
        setValue("bio", values[2].foundProfile.bio);
      }
      if (values[2].foundProfile.links[0]) {
        setValue("linkName1", values[2].foundProfile.links[0].linkName);
        setValue("link1", values[2].foundProfile.links[0].link);
      }
      if (values[2].foundProfile.links[1]) {
        setValue("linkName2", values[2].foundProfile.links[1].linkName);
        setValue("link2", values[2].foundProfile.links[1].link);
      }
      if (values[2].foundProfile.links[2]) {
        setValue("linkName3", values[2].foundProfile.links[2].linkName);
        setValue("link3", values[2].foundProfile.links[2].link);
      }
    });
  }, []);
  useEffect(() => {
    // console.log("user", user);
    // console.log("portfolio", portfolio);
    // console.log("profile", profile);
  }, [isLoading]);
  const onSubmit = (data) => {
    console.log("data", data);
    setUpdate({
      bio: data.bio,
      links: [
        {
          linkName1: data.linkName1,
          link: data.link1,
        },
        {
          linkName1: data.linkName2,
          link: data.link2,
        },
        {
          linkName1: data.linkName3,
          link: data.link3,
        },
      ],
    });
    updateProfile("642c4208b731d3e2f98f1fee", update);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Typography variant="h1"> Loading</Typography>
      ) : (
        <>
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
                <ImageUploader setProfilePicture={setProfilePicture} />

                <Typography variant="h6">{user.user.userName}, NP-C</Typography>
                <Typography variant="h6">Location</Typography>
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
              <Typography>Portfolio</Typography>
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
              <Button variant="contained" onClick={() => setIsOpen(true)}>
                Update Portfolio
              </Button>
              {/* Build Your Portfolio */}
              <Button
                color="primary"
                variant="contained"
                type="submit"
                style={{ marginTop: 16 }}
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
            PaperProps={{ sx: { height: "fit-content" } }}
          >
            <Box>
              <Typography>Portfolio</Typography>
              <ImageUploaderPortfolio
                portfolioPhotos={portfolioPhotos}
                setPortfolioPhotos={setPortfolioPhotos}
                setIsOpen={setIsOpen}
              />
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};
export default EditBio;
