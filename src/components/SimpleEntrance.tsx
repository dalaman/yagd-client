import React from "react";
import {
    Button,
    Box,
    Grid,
    Step,
    StepContent,
    TextField,
    Stack,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NewOrJoin } from "../utils/types";
import { spawnChildProcess } from "../utils/utils";

const asciiArt = String.raw`
 ▄▄   ▄▄ ▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄
█  █ █  █      █       █      █
█  █▄█  █  ▄   █   ▄▄▄▄█  ▄    █
█       █ █▄█  █  █  ▄▄█ █ █   █
█▄     ▄█      █  █ █  █ █▄█   █
  █   █ █  ▄   █  █▄▄█ █       █
  █▄▄▄█ █▄█ █▄▄█▄▄▄▄▄▄▄█▄▄▄▄▄▄█
`;

type SaveStep = {
    label: string;
    description: string;
    disableNext?: boolean;
    comps: React.ReactElement;
    buttonOnClickNext: () => void;
    buttonOnClickBack: () => void;
};

function Entrance() {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    const [newOrJoin, setNewOrJoin] = React.useState<NewOrJoin>();

    const [url, setUrl] = React.useState("");
    const [port, setPort] = React.useState("");

    const handleNext = () => {
        console.log("\n");
        console.log("newOrJoin:", newOrJoin);
        console.log("url:", url);
        console.log("port:", port);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleChangeRoomPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPort(event.target.value);
    };

    const enterRoom = () => {
        navigate("/room");
        spawnChildProcess(url, port);
    };

    const isValidPort = (port: string) => {
        return !isNaN(Number(port)) || port === "";
    };

    const saveStepList: Array<SaveStep> = [
        {
            label: "URL",
            description: "e.g. http://example.com",
            disableNext: url === "",
            comps: (
                <TextField
                    label="URL"
                    variant="standard"
                    onChange={handleChangeUrl}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && url !== "") {
                            handleNext();
                        }
                    }}
                />
            ),
            buttonOnClickNext: handleNext,
            buttonOnClickBack: handleBack,
        },
        {
            label: "Port number",
            description: "",
            disableNext: port === "" || !isValidPort(port),
            comps: (
                <TextField
                    variant="standard"
                    onChange={handleChangeRoomPassword}
                    autoFocus={true}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            enterRoom();
                        }
                    }}
                    error={!isValidPort(port)}
                    helperText={isValidPort(port) ? "" : "Bad port number"}
                />
            ),
            buttonOnClickNext: enterRoom,
            buttonOnClickBack: handleBack,
        },
    ];

    return (
        <Stack direction="row">
            <Box sx={{ flexGrow: 1 }}>
                <pre>
                    <code>{asciiArt}</code>
                </pre>
            </Box>

            <Box sx={{ mr: 10 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {saveStepList.map((saveStep, index) => (
                        <Step key={saveStep.label}>
                            <StepLabel key={index}>{saveStep.label}</StepLabel>

                            <StepContent key={(index + 1) * 10}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography>
                                            {saveStep.description}
                                        </Typography>
                                    </Grid>

                                    <Grid item>{saveStep.comps}</Grid>

                                    <Grid item>
                                        <Box sx={{ mb: 2 }}>
                                            {index !== 0 ? (
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        onClick={
                                                            saveStep.buttonOnClickNext
                                                        }
                                                        disabled={
                                                            saveStep.disableNext
                                                        }
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        {index ===
                                                        saveStepList.length - 1
                                                            ? "Go"
                                                            : "Next"}
                                                    </Button>

                                                    <Button
                                                        onClick={
                                                            saveStep.buttonOnClickBack
                                                        }
                                                        variant="text"
                                                        sx={{ mt: 1, mr: 1 }}
                                                        color="secondary"
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div />
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Stack>
    );
}

export default Entrance;
