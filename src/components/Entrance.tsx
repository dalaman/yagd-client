import React from "react";
import {
    Button,
    Box,
    Grid,
    Step,
    StepContent,
    TextField,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NewOrJoin } from "../utils/types";

type SaveStep = {
    label: string;
    description: string;
    disableNext: boolean;
    comps: React.ReactElement;
    buttonOnClickNext?: () => void;
    buttonOnClickBack?: () => void;
};

function Entrance() {
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);
    const [newOrJoin, setNewOrJoin] = React.useState<NewOrJoin>();

    const [roomId, setRoomId] = React.useState("");
    const [roomPassword, setRoomPassword] = React.useState("");

    const handleNext = () => {
        console.log("\n");
        console.log("newOrJoin:", newOrJoin);
        console.log("roomId:", roomId);
        console.log("roomPassword:", roomPassword);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClickNewOrJoin = (arg: NewOrJoin) => {
        setNewOrJoin(arg);
        handleNext();
    };

    const handleChangeRoomId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(event.target.value);
    };

    const handleChangeRoomPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRoomPassword(event.target.value);
    };

    const enterRoom = () => {
        navigate("/room");
    };

    const saveStepList: Array<SaveStep> = [
        {
            label: "New or Join",
            description: "Create new room or join into existing one",
            disableNext: false,
            comps: (
                <div>
                    <Button
                        color="primary"
                        onClick={() => handleClickNewOrJoin("New")}
                        variant="outlined"
                        sx={{ mt: 1, mr: 1 }}
                    >
                        New
                    </Button>

                    <Button
                        color="secondary"
                        onClick={() => handleClickNewOrJoin("Join")}
                        variant="outlined"
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Join
                    </Button>
                </div>
            ),
        },
        {
            label: "Room ID",
            description:
                newOrJoin === "New"
                    ? "Set new Room ID e.g. xxx"
                    : "Enter Room ID",
            disableNext: roomId === "",
            comps: (
                <TextField
                    label="Room ID"
                    onChange={handleChangeRoomId}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleNext();
                        }
                    }}
                />
            ),
            buttonOnClickNext: handleNext,
            buttonOnClickBack: handleBack,
        },
        {
            label: "Password",
            description:
                newOrJoin === "New" ? "Set password" : "Enter password",
            disableNext: roomPassword === "",
            comps: (
                <TextField
                    label="Room Password"
                    onChange={handleChangeRoomPassword}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            enterRoom();
                        }
                    }}
                />
            ),
            buttonOnClickNext: enterRoom,
            buttonOnClickBack: handleBack,
        },
    ];

    return (
        <Box>
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
    );
}

export default Entrance;
