import React from "react";
import { Grid, CardContent, Typography } from "@mui/material";
import Entrance from "./Entrance";

function Home() {
    return (
        <Grid container direction="column">
            <Grid item>
                <CardContent>
                    <Typography variant="h4" component="div">
                        Welcome to yagd!!
                    </Typography>
                </CardContent>
            </Grid>

            <Grid item sx={{ ml: 5 }}>
                <Entrance />
            </Grid>
        </Grid>
    );
}

export default Home;
