import React from "react";
import {
    Box,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardHeader,
    Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const username = "AA";
const email = "foo@example.com";

const theme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
    },
    palette: {},
});

type Props = {
    openMenuDrawer: boolean;
    toggleMenuDrawer: () => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => void;
};

type IconName = {
    icon: React.ReactElement;
    name: string;
    link: string;
};

const iconNameList: Array<IconName> = [
    {
        icon: <HomeIcon />,
        name: "Home",
        link: "",
    },
    {
        icon: <DescriptionIcon />,
        name: "NormalEditor",
        link: "normal_editor",
    },
    {
        icon: <SettingsIcon />,
        name: "Settings",
        link: "settings",
    },
];

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

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            backgroundcolor: "primary.sub",
        },
        children: name[0],
    };
}

function MenuDrawer(props: Props) {
    const myStatus = (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <ThemeProvider theme={theme}>
                        <Avatar {...stringAvatar(username)} />
                    </ThemeProvider>
                }
                title={username}
                subheader={email}
            />
        </Card>
    );

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={props.toggleMenuDrawer()}
            onKeyDown={props.toggleMenuDrawer()}
        >
            <List>
                {iconNameList.map((iconNameLink: IconName, idx: number) => (
                    <Link
                        to={"/" + iconNameLink.link}
                        style={{
                            textDecoration: "none",
                            color: "white",
                        }}
                        key={idx}
                    >
                        <ListItem button>
                            <ListItemIcon>{iconNameLink.icon}</ListItemIcon>
                            <ListItemText primary={iconNameLink.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key="left">
                <SwipeableDrawer
                    anchor="left"
                    open={props.openMenuDrawer}
                    onClose={props.toggleMenuDrawer()}
                    onOpen={props.toggleMenuDrawer()}
                >
                    {myStatus}
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default MenuDrawer;
