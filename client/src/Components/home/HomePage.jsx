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
  image: {
    justifyContent: "center",
    width: "100%",
    height: "auto",
    maxWidth: "250px"
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    padding: "0",
    paddingTop: "50px",
    flexWrap: "wrap",
    gap: "10px",
  },
}));

function HomePage() {
  const [username, setUsername] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/register");
  };

  return (
    <>
      <ButtonAppBar isHomePage={true} className="AppBar-transparent" />
      <div>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontFamily: "Playfair Display",
                maxWidth: "700px",
                color: "black",
                paddingBottom: "50px",
                
                paddingTop: { xs: "50px", md: "100px" },
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
                textAlign: "center",
                fontFamily: "Playfair Display",
                color: "black",
                marginBottom: "10px",
              }}
            >
              Share organized Before &amp; After photos, deals, and ways to book
              with you in one simple link
            </Typography>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
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
              <hr/>
              <Grid
                container
                className={classes.imageContainer}
                justifyContent="center"
                direction="column"
                padding={20}
                spacing={0}
                
              >
                <Grid item sx={{
                  width: "250.56px",
                  height: "222.17px",
                  left: "55.11px",
                  top: "792.56px",
                  filter: "drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))",
                  transform: "matrix(1, -0.03, -0.14, 0.99, 0, 0);}}>",
                }}>
                  <img src="/1.png" alt="Image 1" className={classes.image} />
                </Grid>
                <Grid item sx={{
                  width: "250.56px",
                  height: "222.17px",
                  right: "55.11px",
                  top: "792.56px",
                  filter: "drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.25))",
                  transform: "matrix(1, -0.03, -0.14, 0.99, 0, 0);}}>",
                }}>
                  <img src="/2.png" alt="Image 2" className={classes.image} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default HomePage;
