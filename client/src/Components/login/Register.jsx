import React, { useState } from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import "./login.css";
import ProfileDetails from "../ProfileDetails/ProfileDetails";
import ButtonAppBar from "../Create/header/HeaderNav";
import { useNavigate } from "react-router-dom";

const Register = ({ setUserId }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [showProfileDetails, setShowProfileDetails] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
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
        // console.log(user);
        // console.log(response);
        navigate("/profile-details");
        await setUserId(user.newUser._id)
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

  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/profile-details");
  };

  return (
    <>
      <ButtonAppBar isHomePage={true} className="AppBar-transparent" />
      <div>
        {showProfileDetails ? (
          <ProfileDetails />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ paddingTop: "70px" }}>
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
                    Username
                  </Typography>
                }
                {...register("userName")}
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
                required
              />
              <TextField
                label={
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Email
                  </Typography>
                }
                type="email"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                required
              />
              <TextField
                label={
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Password
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
                required
              />
              <TextField
                label={
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Confirm Password
                  </Typography>
                }
                type="password"
                required
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
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
                By clicking, you agree to the Terms of Service & Privacy Policy
                for Cosmable.
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
        )}
      </div>
    </>
  );
};

export default Register;
