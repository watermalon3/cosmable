import React, { useEffect, useState } from "react";
import { Stack, Typography, TextField, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import "./login.css";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import ButtonAppBar from "../Create/header/HeaderNav";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Register = ({ setUserId }) => {
  const { setIsLoggedIn } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [showProfileDetails] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setValue("userName", location.state.id);
  }, []);

  const createProfile = async (userId) => {
    let body = { userId: userId };
    try {
      const profile = await fetch(profileUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
    } catch (error) {
      console.error("An error occurred creating the profile:", error);
    }
  };

  const onSubmit = async (data) => {
    let body = data;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      const user = await response.json();
      if (response.ok) {
        navigate("/profile-details");
        setIsLoggedIn(true);
        localStorage.setItem("userId", user.newUser._id);
        createProfile(user.newUser._id);
        reset();
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  let url = "http://127.0.0.1:4000/user/register";
  let profileUrl = "http://127.0.0.1:4000/routes/createprofile";
  const navigate = useNavigate();

  return (
    <>
      <ButtonAppBar isHomePage={true} />
      <div className="register-container" style={{ marginBottom: "-225px" }}>
        {showProfileDetails ? (
          <ProfileDetails />
        ) : (
          <Paper
            elevation={3}
            sx={{
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
              <Stack spacing={2} sx={{ paddingTop: "50px" }}>
                <Typography
                  className="create-header"
                  variant="h3"
                  sx={{
                    fontFamily: "Playfair Display",
                    fontWeight: 400,
                    fontSize: "30px",
                    lineHeight: "39.99px",
                    marginBottom: "20px",
                  }}
                >
                  Create your account
                </Typography>
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Username<span style={{ color: "525252" }}>*</span>
                    </Typography>
                  }
                  {...register("userName")}
                  error={Boolean(errors.userName)}
                  helperText={errors.userName?.message}
                  InputProps={{
                    startAdornment: (
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        cosmable.co/
                      </Typography>
                    ),
                  }}
                />
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Email <span style={{ color: "525252" }}>*</span>
                    </Typography>
                  }
                  type="email"
                  {...register("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Password<span style={{ color: "525252" }}>*</span>
                    </Typography>
                  }
                  type="password"
                  {...register("password", {
                    validate: (value) => value === watch("confirmPassword"),
                    minLength: 8,
                  })}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password?.type === "required"
                      ? "Password is required"
                      : (errors.password?.type === "minLength" &&
                          "Password must be at least 8 characters long") ||
                        errors.password?.message
                  }
                />
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Confirm Password<span style={{ color: "525252" }}>*</span>
                    </Typography>
                  }
                  type="password"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("password") ||
                      "The passwords do not match",
                    minLength: 8,
                  })}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword?.message}
                />
                <Typography
                  className="create-header"
                  variant="h6"
                  sx={{
                    textAlign: "left",
                    fontFamily: "Playfair Display",
                  }}
                >
                  By clicking, you agree to the Terms of Service & Privacy
                  Policy for Cosmable.
                </Typography>

                <Button
                  className="btn"
                  color="success"
                  variant="contained"
                  type="submit"
                  sx={{
                    height: "40px",
                    width: "120px",
                    backgroundColor: "#5A5252",
                    padding: "2px",
                    fontFamily: "Playfair Display",
                    textTransform: "none",
                  }}
                >
                  Join for Free
                </Button>
              </Stack>
            </form>
          </Paper>
        )}
      </div>
    </>
  );
};

export default Register;
