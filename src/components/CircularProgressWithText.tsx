import React from "react";
import { Backdrop, CircularProgress, Stack } from "@mui/material";

type Props = {
    open: boolean;
    whatURwating4: string;
    children?: React.ReactNode;
};

function CircularProgressWithText(props: Props) {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress color="inherit" />
                <h2>Connecting...</h2>
                {props.children}
            </Stack>
        </Backdrop>
    );
}

export default CircularProgressWithText;
