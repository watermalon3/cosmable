import React from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const Almost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h3">Almost there</Typography>
        <TextField
          label="name"
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          required
        />
        <TextField
          label="Title or designation, i.e. BSN"
          type="title"
          {...register("title")}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          required
        />
        <TextField
          label="Your practice name"
          type="practiceName"
          {...register("practiceName")}
          error={Boolean(errors.practiceName)}
          helperText={errors.practiceName?.message}
          required
        />
        <TextField
          label="Your practice zip code"
          type="zipcode"
          {...register("zipcode")}
          error={Boolean(errors.zipcode)}
          helperText={errors.zipcode?.message}
        />
        <Typography varient="h6">You are an...</Typography>
        <FormControlLabel
          control={<Checkbox {...register("aesthetician")} />}
          label="Aesthetician"
        />
        <FormControlLabel
          control={<Checkbox {...register("injector")} />}
          label="Injector"
        />
        <FormControlLabel
          control={
            <Checkbox {...register("aestheticianPracticeOwnerManager")} />
          }
          label="Aestheticain Practice Owner/Manager"
        />
        <FormControlLabel
          control={<Checkbox {...register("other")} />}
          label="Other"
        />
        <Button color="success" varient="contained" type="submit">
          Get Started
        </Button>
      </Stack>
    </form>
  );
};
export default Almost;
