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
} from "@mui/material";
import ImageUploader from "../Upload/ImageUploader";

const Bio = () => {
  const [userData, setUserData] = useState(null);
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState("");
  const [editLinks, setEditLink] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //   useEffect(() => {
  //     fetch("/Users")
  //       .then((response) => response.json())
  //       .then((data) => setUserData(data));
  //   }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setBio(data.bio ? data.bio : bio);
    setLinks(data.link ? data.link : links);
    setEditBio(false);
    reset();
  };

  function updateBio() {
    setEditBio(!editBio);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h3"></Typography>

          {/* Profile Image Upload */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: "gray",
                marginBottom: 16,
              }}
            ></div>
            <Typography variant="h6" style={{ marginBottom: 16 }}>
              Upload Profile Image
            </Typography>
          </div>

          {/* User Data */}
          {/* {userData && (
                    <>
                    <TextField
                        label="Name"
                        {...register("name")}
                        defaultValue={userData.name}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    required
                    />
                    <TextField
                        label="Title or designation, i.e. BSN"
                        type="title"
                        {...register("title")}
                        defaultValue={userData.title}
                        errors={Boolean(errors.title)}
                        helperText={errors.title?.message}
                        required
                    />
                    <TextField
                        label="Your practice name"
                        type="practiceName"
                        {...register("practiceName")}
                        defaultValue={userData.practiceName}
                        error={Boolean(errors.practiceName)}
                        helperText={errors.practiceName?.message}
                        required
                    />
                    <TextField
                        label="Your practice zipcode"
                        type="zipcode"
                        {...register("zipcode")}
                        defaultValue={userData.zipcode}
                        error={Boolean(errors.zipcode)}
                        helperText={errors.zipcode?.message}
                        required
                    />
                    </>
                )} */}
          {/* Add Bio */}
          <Accordion>
            <AccordionSummary>
              <Typography>Bio</Typography>
            </AccordionSummary>
            <Typography>{bio}</Typography>
          </Accordion>

          {editBio && (
            <TextField
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
            <Typography>{links}</Typography>
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
          <Button onClick={() => setIsOpen(true)}>Update Portfolio</Button>
          {/* Build Your Portfolio */}
          <Typography
            label="+ Build your portfolio"
            multiline
            minRows={4}
            {...register("portfolio")}
            error={Boolean(errors.portfolio)}
            helperText={errors.portfolio?.message}
            required
          />
          {!editBio && (
            <Button variant="contained" onClick={updateBio}>
              Edit Profile
            </Button>
          )}

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
      {/* create drawer */}
      <Drawer anchor="bottom" open={isOpen} onClose={() => setIsOpen(false)}>
        <Paper sx={{ height: "50vh", borderRadius: "20px" }}>
          <Typography>Some Words</Typography>
          <ImageUploader />
        </Paper>
      </Drawer>
    </>
  );
};
export default Bio;
