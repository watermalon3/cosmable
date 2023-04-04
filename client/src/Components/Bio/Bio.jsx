import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const Bio = () => {
  return (
    <Stack spacing={2} sx={{ textAlign: "center", paddingTop: "70px" }}>
      <IconButton
        component={Link}
        to="/dashboard/edit"
        sx={{ alignSelf: "end" }}
      >
        <EditIcon />
      </IconButton>
      <Avatar sx={{ width: 150, height: 150 }} />
      <Typography>UserName </Typography>
      <Typography> Location </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Bio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>bio text</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Links</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Links</Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default Bio;
