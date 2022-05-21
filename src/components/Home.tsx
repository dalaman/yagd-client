import React from "react";
import { Grid, CardContent, Typography } from "@mui/material";
import SimpleEntrance from "./SimpleEntrance";
import { killChildProcess } from "../utils/utils";

function Home() {
    React.useEffect(() => {
        killChildProcess();
    }, []);

    return (
        <Grid container direction="column">
            <Grid item>
                <CardContent>
                    <Typography variant="h4" component="div">
                        Welcome to
                    </Typography>
                </CardContent>
            </Grid>

            <Grid item sx={{ ml: 5 }}>
                <SimpleEntrance />
            </Grid>
        </Grid>
    );
}

export default Home;
