import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import backgroundImage from "/test.jpg";
import ButtonAppBar from "../Create/header/HeaderNav";
import { Grid, Typography, TextField, Button } from "@mui/material";
import "./home.css";

const useStyles = makeStyles({
  hero: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover"
  },
});

function HomePage() {
  const classes = useStyles();
  const [username, setUsername] = useState("");

  const handleJoinClick = () => {
    if (username) {
      window.location.href = `https://cosmable.co/${username}`;
    }
  };

  return (
    <div className={classes.hero}>
      <ButtonAppBar isHomePage={true} className="AppBar-transparent" />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1">
            One bio link for everything aesthetics.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" align="center">
            Share organized Before &amp; After photos, deals, and ways to book
            with you in one simple link
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <TextField
                sx={{ border: "2px solid #5A5252" }}
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
            <Grid item>
              <Button
                className="home-btn"
                variant="contained"
                color="primary"
                onClick={handleJoinClick}
                style={{ backgroundColor: "#5A5252" }}
              >
                Join for Free
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
