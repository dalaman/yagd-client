import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuDrawer from "./MenuDrawer";

const title = "yagd";

function Header() {
    const [openMenuDrawer, setOpenMenuDrawer] = React.useState(false);

    const toggleMenuDrawer =
        () => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setOpenMenuDrawer(!openMenuDrawer);
        };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <MenuDrawer
                openMenuDrawer={openMenuDrawer}
                toggleMenuDrawer={toggleMenuDrawer}
            />

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleMenuDrawer()}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
