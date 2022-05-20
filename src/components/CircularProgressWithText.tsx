import React from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";

type Props = {
    open: boolean;
    whatURwating4: string;
};

function CircularProgressWithText(props: Props) {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress color="inherit" />
                <h2>Connecting...</h2>
            </Stack>
        </Backdrop>
    );
}

export default CircularProgressWithText;
