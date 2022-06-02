import React from "react";
import { CardContent, Typography } from "@mui/material";
import TextEditor from "./TextEditor";

const title = "NormalEditor";

function NormalEditor() {
    return (
        <div>
            <CardContent>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </CardContent>

            <TextEditor />
        </div>
    );
}

export default NormalEditor;
