import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import "./homeLogin.css";
import ButtonAppBar from "../Create/header/HeaderNav";


function HomeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let body = { email, password }
  let url = "http://127.0.0.1:4000/user/login"
  const handleLoginClick = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json"
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <ButtonAppBar isHomePage={true} className="AppBar-transparent" />
      <div
        className="background-text"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
        
      >
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
        <Grid container direction="column" alignItems="center" spacing={2} className="background-text" style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
            minWidth: "300px",
            maxWidth: "400px",
          }}>
          <Grid item>
            <Typography variant="h6" sx={{ fontFamily: "Playfair Display"}}>Welcome back</Typography >
          </Grid>
          <Grid item>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
              
            />
          </Grid>
          <Grid item>
          
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
              style={{ backgroundColor: "#5A5252" }}
              sx={{ fontFamily: "Playfair Display"}}
            >
              Login
            </Button>
            
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center" sx={{ fontFamily: "Playfair Display"}}>
              Don't have an account yet? <a href="/register">Register</a>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default HomeLogin;