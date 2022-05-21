import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const asciiArt = String.raw`
 ▄▄   ▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄
█  █ █  █      █       █      █
█  █▄█  █  ▄   █   ▄▄▄▄█  ▄    █
█       █ █▄█  █  █  ▄▄█ █ █   █
█▄     ▄█      █  █ █  █ █▄█   █
  █   █ █  ▄   █  █▄▄█ █       █
  █▄▄▄█ █▄█ █▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄█
`;

function SimpleEntrance() {
    const navigate = useNavigate();
    const enterRoom = () => {
        navigate("/room");
    };

    return (
        <div>
            <pre>
                <code>{asciiArt}</code>
            </pre>
            <Button variant="contained" onClick={enterRoom} sx={{ mt: 5 }}>
                Go
            </Button>
        </div>
    );
}

export default SimpleEntrance;
