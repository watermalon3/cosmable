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
} from "@mui/material";
import ImageUploader from "../Upload/ImageUploader";

const Bio = () => {
  const [userData, setUserData] = useState(null);
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editProfilePicture, setEditProfilePicture] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setBio(data.bio ? data.bio : bio);
    if (data.link) {
      console.log("links", links);

      setLinks([...links, data.link]);
    }
    console.log(profilePicture);
    setEditBio(false);
    reset();
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditProfilePicture(false);
  };

  function updateBio() {
    setEditBio(!editBio);
  }
  return (
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
            <Avatar sx={{ width: 150, height: 150 }} src={profilePicture} />
            {editBio && (
              <Button
                variant="contained"
                onClick={() => {
                  setIsOpen(true);
                  setEditProfilePicture(true);
                }}
              >
                {" "}
                Update Profile Picture
              </Button>
            )}

            <Typography variant="h6"> User Name, NP-C</Typography>
            <Typography variant="h6">Location</Typography>
          </div>

          {/* Add Bio */}
          <Accordion>
            <AccordionSummary>
              <Typography>Bio</Typography>
            </AccordionSummary>
            <Typography>{bio}</Typography>
          </Accordion>

          {editBio && (
            <TextField
              fullWidth
              label="+ Add bio"
              {...register("bio")}
              errors={Boolean(errors.bio)}
              helperText={errors.bio?.message}
            />
          )}
          <Accordion>
            <AccordionSummary>
              <Typography>Links</Typography>
            </AccordionSummary>
            <Stack>
              {/* <Typography>{links}</Typography> */}
              {links.map((link) => (
                <Button href={link} target="_blank" variant="contained">
                  {link}
                </Button>
              ))}
            </Stack>
          </Accordion>
          {/* Add Link */}
          {editBio && (
            <TextField
              label="+ Add link"
              {...register("link")}
              error={Boolean(errors.link)}
              helperText={errors.link?.message}
            />
          )}
          <Typography>Portfolio</Typography>
          {editBio && (
            <Button variant="contained" onClick={() => setIsOpen(true)}>
              Update Portfolio
            </Button>
          )}
          {/* Build Your Portfolio */}
          {!editBio && (
            <Button variant="contained" onClick={updateBio}>
              Edit Profile
            </Button>
          )}

          {editBio && (
            <Button
              color="primary"
              variant="contained"
              type="submit"
              style={{ marginTop: 16 }}
            >
              Save Changes
            </Button>
          )}
        </Stack>
      </form>
      <Drawer anchor="bottom" open={isOpen} onClose={() => handleClose()}>
        <Paper sx={{ height: "50vh", borderRadius: "20px" }}>
          {!editProfilePicture && <Typography>Portfolio</Typography>}
          {editProfilePicture && <Typography>Profile Picture</Typography>}
          <ImageUploader
            editProfilePicture={editProfilePicture}
            setEditProfilePicture={setEditProfilePicture}
            setProfilePicture={setProfilePicture}
          />
        </Paper>
      </Drawer>
    </>
  );
};
export default Bio;
