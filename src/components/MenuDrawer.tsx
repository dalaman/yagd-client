import React from "react";
import {
    Box,
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { WHOAMI } from "../utils/config";
import Avatar from "./Avatar";

const email = "foo@example.com";

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

function MenuDrawer(props: Props) {
    const myStatus = (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={<Avatar name={WHOAMI} />}
                title={WHOAMI}
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
