import React from "react";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import "./login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
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
            textAlign: "left",
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
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        inputProps={{ style: { fontFamily: "'Playfair Display', serif" } }}
        sx={{
          width: { xs: "100%", md: "66.7%" },
        }}
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
      {...register("email")}
      error={Boolean(errors.name)}
      helperText={errors.name?.message}
      inputProps={{ style: { fontFamily: "'Playfair Display', serif" } }}
      sx={{
        width: { xs: "100%", md: "66.7%" },
      }}
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
          inputProps={{ style: { fontFamily: "'Playfair Display', serif" } }}
          
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
          
          {...register("confirmPassword", {
            validate: (value) =>
              value === watch("password") || "The passwords do not match",
            minLength: 8,
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          inputProps={{ style: { fontFamily: "'Playfair Display', serif" } }}
        />
        <Typography
          className="create-header"
          variant="h6"
          sx={{
            textAlign: "left",
            fontFamily: "Playfair Display",
          }}
        >
          By clicking, you agree to the Terms of Service & Privacy Policy for
          Cosmable.
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
            textTransform: "none"
          }}
        >
          Join for Free
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
