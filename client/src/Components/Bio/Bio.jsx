import React from "react";
import {
  Stack,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import ButtonAppBar from "../Create/header/HeaderNav";

const Bio = () => {
  return (
    <div>
      <ButtonAppBar isHomePage={false} className="AppBar-transparent" />
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#F5F5F5",
          transform: "translateZ(10px)",
          marginTop: "150px",
          padding: "20px",
          height: "70vh",
          maxWidth: "600px",
          "@media (min-width: 600px)": {
            padding: "40px",
          },
          margin: "100px auto 0",
          
        }}
      >
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
                // marginBottom: "10px",
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
                color: "#5A5252",
                // paddingTop: "10px",
              }}
            >
              bio text
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ width: "75%", margin: "auto", marginTop: "20px" }}>
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
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Playfair Display",
                fontSize: "18px",
                lineHeight: "22px",
                color: "#5A5252",
              }}
            >
              Links
            </Typography>
          </AccordionDetails>
        

      </Accordion>
    
    </Paper>
    </div>
  );
};

export default Bio;
