import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import ButtonAppBar from "../Create/header/HeaderNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import {
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5A5252",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#5A5252",
          },
        },
      },
    },
  },
});

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  homeBackground: {
    // background: 'url("/HomePic.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  whiteBackground: {
    backgroundColor: "#fff",
  },
}));

const Almost = ({ userId }) => {
  const { setIsLoggedIn } = useAuth();

  console.log(userId, " -------");
  const classes = useStyles();
  const id = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    let body = data;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        navigate("/dashboard/edit");
        reset();
      } else {
        const errorData = await response.json();
        console.error("Something went wrong:", errorData);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };
  let url = `http://127.0.0.1:4000/routes/updateUser/${id}`;

  const navigate = useNavigate();

  return (
    <>
      <ButtonAppBar isHomePage={false} style={{ backgroundColor: "#fff" }} />
      <div className="profile-details">
        <Paper
          elevation={3}
          sx={{
            overflow: "hidden",
            borderRadius: "15px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
            zIndex: 1,
            padding: "20px",
            margin: "auto",
            maxWidth: "630px",
            marginTop: "100px",
            paddingBottom: "50px",
          }}
          style={{ overflow: "hidden" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={2}
              sx={{
                paddingTop: "50px",

                fontFamily: "Playfair Display",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Playfair Display",
                  fontWeight: 400,
                  fontSize: "30px",
                  lineHeight: "39.99px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Almost there
              </Typography>
              <ThemeProvider theme={theme}>
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Name<span className={classes.asterisk}>*</span>
                    </Typography>
                  }
                  {...register("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  sx={{
                    width: { xs: "100%", md: "100%" },
                  }}
                />
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Title or designation, i.e. BSN
                      <span className={classes.asterisk}>*</span>
                    </Typography>
                  }
                  type="title"
                  {...register("title")}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  sx={{
                    width: { xs: "100%", md: "100%" },
                  }}
                />
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Your practice name
                      <span className={classes.asterisk}>*</span>
                    </Typography>
                  }
                  type="practiceName"
                  {...register("practiceName")}
                  error={Boolean(errors.practiceName)}
                  helperText={errors.practiceName?.message}
                  sx={{
                    width: { xs: "100%", md: "100%" },
                  }}
                  style={{ fontFamily: "Playfair Display " }}
                />
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Your practice city, state
                      <span className={classes.asterisk}>*</span>
                    </Typography>
                  }
                  type="city"
                  {...register("city")}
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                  sx={{
                    width: { xs: "100%", md: "100%" },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ textAlign: "left", fontFamily: "Playfair Display" }}
                >
                  You are an...
                </Typography>
                <Stack direction="column">
                  <Stack direction="row">
                    <FormControlLabel
                      control={<Checkbox {...register("aesthetician")} />}
                      label={
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Aesthetician
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox {...register("injector")} />}
                      label={
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Injector
                        </Typography>
                      }
                    />
                  </Stack>
                  <Stack direction="column">
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("aestheticianPracticeOwnerManager")}
                        />
                      }
                      label={
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Practice Owner/Manager
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox {...register("other")} />}
                      label={
                        <Typography
                          variant="h6"
                          sx={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          Other
                        </Typography>
                      }
                    />
                  </Stack>
                </Stack>
              </ThemeProvider>
              <Button
                color="success"
                variant="contained"
                type="submit"
                sx={{
                  fontFamily: "Playfair Display",
                  backgroundColor: "#5A5252",
                  height: "40px",
                  border: "2px solid #5A5252",
                  padding: "2px",
                  width: "120px",
                  textTransform: "none",
                  color: "#FFFFFF",
                  bgcolor: "#5A5252",
                  "&:hover": {
                    bgcolor: "#FFFFFF",
                    color: "#5A5252",
                  },
                }}
              >
                Get Started
              </Button>
            </Stack>
          </form>
        </Paper>
      </div>
    </>
  );
};
export default Almost;
