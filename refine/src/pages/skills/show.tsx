import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    NumberField,
    DateField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";

export const SkillShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <TextField value={record?.id} />
                <br/>
                <Typography variant="body1" fontWeight="bold">
                    User id
                </Typography>
                <TextField value={record?.userId} />
                <br/>
                <Typography variant="body1" fontWeight="bold">
                    Name
                </Typography>
                <TextField value={record?.name} />
                <br/>
                <Typography variant="body1" fontWeight="bold">
                    Level
                </Typography>
                <NumberField value={record?.level ?? ""} />
                <br/>
                <Typography variant="body1" fontWeight="bold">
                    Experience Percent In Current Level
                </Typography>
                <NumberField
                    value={record?.experiencePercentInCurrentLevel ?? ""}
                />
                <br/>
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.$createdAt} />
                <br/>
                <Typography variant="body1" fontWeight="bold">
                    Updated At
                </Typography>
                <DateField value={record?.$updatedAt} />
            </Stack>
        </Show>
    );
};
