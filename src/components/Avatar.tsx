import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar as MuiAvatar, Tooltip } from "@mui/material";

const theme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
    },
    palette: {},
});

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

type MuiAvatarProps = {
    bgcolor: string;
    backgroundcolor: string;
    height?: number;
    width?: number;
};

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            backgroundcolor: "primary.sub",
        } as MuiAvatarProps,
        children: name[0],
    };
}

type Props = {
    name: string;
    size?: number;
};

function Avatar(props: Props) {
    const muiAvatarProps = { ...stringAvatar(props.name) };

    if (props.size) {
        muiAvatarProps.sx.height = props.size;
        muiAvatarProps.sx.width = props.size;
    }

    return (
        <ThemeProvider theme={theme}>
            <Tooltip title={props.name} placement="top">
                <MuiAvatar {...muiAvatarProps} />
            </Tooltip>
        </ThemeProvider>
    );
}

export default Avatar;
