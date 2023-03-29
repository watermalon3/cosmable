import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Checkbox,
    FormControlLabel,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

const Bio = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch("/Users")
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }, []);

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
                <Typography variant="h3"></Typography>

                {/* Profile Image Upload */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <div style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: "gray", marginBottom: 16 }}></div>
                    <Typography variant="h6" style={{ marginBottom: 16 }}>Upload Profile Image</Typography>
                </div>

                {/* User Data */}
                {userData && (
                    <>
                    <TextField
                        label="Name"
                        {...register("name")}
                        defaultValue={userData.name}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                    required
                    />
                    <TextField
                        label="Title or designation, i.e. BSN"
                        type="title"
                        {...register("title")}
                        defaultValue={userData.title}
                        errors={Boolean(errors.title)}
                        helperText={errors.title?.message}
                        required
                    />
                    <TextField
                        label="Your practice name"
                        type="practiceName"
                        {...register("practiceName")}
                        defaultValue={userData.practiceName}
                        error={Boolean(errors.practiceName)}
                        helperText={errors.practiceName?.message}
                        required
                    />
                    <TextField
                        label="Your practice zipcode"
                        type="zipcode"
                        {...register("zipcode")}
                        defaultValue={userData.zipcode}
                        error={Boolean(errors.zipcode)}
                        helperText={errors.zipcode?.message}
                        required
                    />
                    </>
                )}
                {/* Add Bio */}
                <TextField
                    label="+ Add bio"
                    {...register("bio")}
                    errors={Boolean(errors.bio)}
                    helperText={errors.bio?.message}
                    required
                />

                {/* Add Link */}
                <TextField
                    label="+ Add link"
                    {...register("link")}
                    error={Boolean(errors.link)}
                    helperText={errors.link?.message}
                    required
                />

                {/* Build Your Portfolio */}
                <Typography 
                    label="+ Build your portfolio"
                    multiline
                    minRows={4}
                    {...register("portfolio")}
                    error={Boolean(errors.portfolio)}
                    helperText={errors.portfolio?.message}
                    required
                />

                <Button color="primary" variant="contained" type="submit" style={{ marginTop: 16}}>
                    Save Changes
                </Button>
            </Stack>
        </form>
    )
}
export default Bio;