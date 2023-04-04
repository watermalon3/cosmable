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
// TODO GET for user and Profile
// TODO create a put for a profile
const EditBio = () => {
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [portfolioPhotos, setPortfolioPhotos] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (data.link && data.linkName) {
      setLinks([
        ...links,
        {
          link: data.link,
          linkName: data.linkName,
        },
      ]);
    }
    setBio(data.bio ? data.bio : bio);
    console.log(profilePicture);
    reset();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

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
            <ImageUploader setProfilePicture={setProfilePicture} />

            <Typography variant="h6"> User Name, NP-C</Typography>
            <Typography variant="h6">Location</Typography>
          </div>
          <TextField
            fullWidth
            label="+ Add bio"
            {...register("bio")}
            //   errors={Boolean(errors.bio)}
            //   helperText={errors.bio?.message}
          />
          <Accordion>
            <AccordionSummary>
              <Typography>Links</Typography>
            </AccordionSummary>
            <Stack>
              {/* <Typography>{links}</Typography> */}
              {links.map((link) => (
                <Button href={link.link} target="_blank" variant="contained">
                  {link.linkName}
                </Button>
              ))}
            </Stack>
          </Accordion>
          {/* Add Link */}
          <TextField
            label="+ name"
            {...register("linkName")}
            //   error={Boolean(errors.link)}
            //   helperText={errors.link?.message}
          />
          <TextField
            label="+ Add link"
            {...register("link")}
            //   error={Boolean(errors.link)}
            //   helperText={errors.link?.message}
          />
          <Typography>Portfolio</Typography>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {portfolioPhotos.map((item) => {
              console.log("item", item);
              return (
                <ImageListItem>
                  <img
                    src={`${item.photoLinks}?w=164&h=164&fit=crop&auto=format`}
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
  );
};
export default EditBio;
