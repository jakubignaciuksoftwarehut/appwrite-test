import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

export const SkillCreate = () => {
    const {
        saveButtonProps,
        refineCore: { formLoading },
        register,
        control,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete="off"
            >
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.name}
                    helperText={(errors as any)?.name?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    label="Name"
                    name="name"
                />
                <TextField
                    {...register("level", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.level}
                    helperText={(errors as any)?.level?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Level"
                    name="level"
                />
                <TextField
                    {...register("experiencePercentInCurrentLevel", {
                        required: "This field is required",
                        valueAsNumber: true,
                    })}
                    error={!!(errors as any)?.experiencePercentInCurrentLevel}
                    helperText={
                        (errors as any)?.experiencePercentInCurrentLevel
                            ?.message
                    }
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Experience Percent In Current Level"
                    name="experiencePercentInCurrentLevel"
                />
                 <TextField
                    {...register("userId", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.$createdAt}
                    helperText={(errors as any)?.$createdAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="userId"
                    name="userId"
                />
                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("$createdAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.$createdAt}
                    helperText={(errors as any)?.$createdAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="$created At"
                    name="$createdAt"
                />

                {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
                <TextField
                    {...register("$updatedAt", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.$updatedAt}
                    helperText={(errors as any)?.$updatedAt?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    label="$updated At"
                    name="$updatedAt"
                />
            </Box>
        </Create>
    );
};
