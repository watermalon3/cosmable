import React from "react";
import { Stack, Typography, Avatar } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

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
      <Avatar sx={{ width: 150, height: 150, margin: "auto" }} />
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Playfair Display",
          fontWeight: 400,
          fontSize: "30px",
          lineHeight: "39.99px",
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Playfair Display",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "24px",
            }}
          >
            Bio
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Playfair Display",
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            bio text
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Playfair Display",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "24px",
            }}
          >
            Links
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Playfair Display",
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            Links
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default Bio;