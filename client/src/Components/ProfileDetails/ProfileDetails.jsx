import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import {
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  homeBackground: {
    background: 'url("/HomePic.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  whiteBackground: {
    backgroundColor: '#fff',
  },
  astericks: {
    fontSize: '0.8em',
    verticalAlign: 'super',
    color: '#5A5252',
    marginLeft: 2,
  },
}));

const Almost = () => {
  const classes = useStyles();

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
    <div className={classes.whiteBackground}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        sx={{
          paddingTop: "70px",
          alignItems: "flex-start",
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
            textAlign: "left",
          }}
        >
          Almost there
        </Typography>
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
            width: { xs: "100%", md: "66.7%" },
          }}
        />
        <TextField
          label={
            <Typography
              variant="h6"
              sx={{ fontFamily: "'Playfair Display', serif" }}
            >
              Title or designation, i.e. BSN<span className={classes.asterisk}>*</span>
            </Typography>
          }
          type="title"
          {...register("title")}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          
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
              Your practice name<span className={classes.asterisk}>*</span>
            </Typography>
          }
          type="practiceName"
          {...register("practiceName")}
          error={Boolean(errors.practiceName)}
          helperText={errors.practiceName?.message}
          
          sx={{
            width: { xs: "100%", md: "66.7%" },
          }}
          stlye={{ fontFamily: "Playfair Display " }}
        />
        <TextField
          label={
            <Typography
              variant="h6"
              sx={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your practice zipcode<span className={classes.asterisk}>*</span>
            </Typography>
          }
          type="zipcode"
          {...register("zipcode")}
          error={Boolean(errors.zipcode)}
          helperText={errors.zipcode?.message}
          sx={{
            width: { xs: "100%", md: "66.7%" },
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
                  sx={{ fontFamily: "'Playfair Display', serif"}} 
                  >
                  Injector
                  
                  </Typography>

                }
            />
          </Stack>
          <Stack direction="column">
            <FormControlLabel
              control={
                <Checkbox {...register("aestheticianPracticeOwnerManager")} />
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
        <Button
          color="success"
          varient="contained"
          type="submit"
          sx={{
            fontFamily: "Playfair Display",
            backgroundColor: "#5A5252",
            color: "#fff",
            height: "60px",
            width: "130px",
            textTranform: "none"
          }}
        >
          Get Started
        </Button>
      </Stack>
    </form>
    </div>
  );
};
export default Almost;



