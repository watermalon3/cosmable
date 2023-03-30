import React, { useState } from "react";
import ButtonAppBar from "../Create/header/HeaderNav";
import { Grid, Typography, TextField, Button } from "@mui/material";
import "./homeLogin.css"


function HomeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    if (email && password) {
      if (email === "example@gmail.com" && password === "password123") {
        window.alert("Login successful!");
      } else {
        window.alert("Invalid email or password. Please try again.");
      }
    } else {
      window.alert("Please enter your email and password.");
    }
  };

  return (
    <div>
      <ButtonAppBar isHomePage={true} className="AppBar-transparent" />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography
            variant="h2"
            sx={{
              textAlign: "left",
              fontFamily: "Playfair Display",
              maxWidth: "700px",
              color: "white",
              paddingBottom: "100px",
              paddingTop: ""
            }}
          >
            {" "}
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
              paddingBottom: "20px"
            }}
          >
            {" "}
            Share organized Before & After photos, deals, and ways to book with
            you in one simple link.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            className="emailField"
            sx={{ border: "2px solid #5A5252", width: { xs:'100%', md: '66.7%'}, height: {xs: '100%', md: "66.7%"} }}
            style={{ backgroundColor: "white" }}
            label={ <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif"}}>
              Email
            </Typography>}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            margin="dense"
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{ border: "2px solid #5A5252", width: {xs: "100%", md: "66.7%"}, height: {xs: '100%', md: "66.7%"} }}
            style={{ backgroundColor: "white" }}
            label={ <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif"}}>  
            Password
            </Typography>}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
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
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "white", fontFamily: "Playfair Display" }}
          >
            Don't have an account yet? <a href="/register">Register</a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomeLogin;
