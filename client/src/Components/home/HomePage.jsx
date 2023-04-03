import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import ButtonAppBar from "../Create/header/HeaderNav";
import { Grid, Typography, TextField, Button } from "@mui/material";
import "./home.css";
// import CreateAccount from "../login/login";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

function HomePage() {
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/login");
  };

  return (
    <>
      <ButtonAppBar isHomePage={true} className="AppBar-transparent" />
      <div className={classes.homeBackground}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h3"
              sx={{
                textAlign: "left",
                fontFamily: "Playfair Display",
                maxWidth: "700px",
                color: "white",
                paddingBottom: "50px",
                paddingTop: "100px",
                marginTop: "50px",
              }}
            >
              One bio link for everything aesthetics.
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                textAlign: "left",
                fontFamily: "Playfair Display",
                color: "white",
                marginBottom: "10px",
              }}
            >
              Share organized Before &amp; After photos, deals, and ways to book
              with you in one simple link
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <TextField
                  sx={{
                    width: { xs: "100%", md: "66.7%" },
                    height: { xs: "100%", md: "66.7%" },
                    borderRadius: 0,
                  }}
                  style={{ backgroundColor: "white" }}
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <Typography variant="body1">cosmable.co/</Typography>
                    ),
                  }}
                />
              </Grid>
              <Grid item className={classes.buttonContainer}>
                <Button
                  className="home-btn"
                  variant="contained"
                  color="primary"
                  onClick={handleJoinClick}
                  style={{ backgroundColor: "#5A5252" }}
                  sx={{
                    width: { xs: "100%", md: "66.7%" },
                    height: { xs: "100%", md: "66.7%" },
                    minHeight: "50px",
                    minWidth: "219px",
                    fontFamily: "Playfair Display",
                    borderRadius: 0,
                    border: "2px solid #5A5252",
                  }}
                >
                  Join for Free
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default HomePage;
