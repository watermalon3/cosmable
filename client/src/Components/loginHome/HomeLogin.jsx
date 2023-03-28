import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import backgroundImage from "/test.jpg";
import ButtonAppBar from "../Create/header/HeaderNav";
import { Grid, Typography, TextField, Button } from "@mui/material";

const useStyles = makeStyles({
  hero: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    // width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    objectFit: "cover",
  },
});

function HomeLogin() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {};

  return (
    <div className={classes.hero}>
      <ButtonAppBar isHomePage={true} className="AppBar-transparent" />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h1">Login</Typography>
        </Grid>
        <Grid item>
          <TextField
            sx={{ border: "2px solid #5A5252" }}
            style={{ backgroundColor: "white" }}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{ border: "2px solid #5A5252" }}
            style={{ backgroundColor: "white" }}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid item>
          <Button
            className="home-btn"
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
            style={{ backgroundColor: "#5A5252" }}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="body1" align="center" sx={{ color: "white" }}>
            Don't have an account yet? <a href="/register">Register</a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeLogin;
