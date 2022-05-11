import React from "react";
import {
    AvatarGroup,
    Button,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import TextEditor from "./TextEditor";
import { sendWrapper } from "../utils/websocket";
import Avatar from "./Avatar";

const title = "Room";

const memberList = ["Alice", "Bob", "Chris", "David", "Elizabeth"];
const maxAvatarDisplay = 4;
const memberAvatarSize = 35;

function Room() {
    const avatarGroup = (
        <AvatarGroup max={maxAvatarDisplay}>
            {memberList.map((member: string, idx: number) => (
                <Avatar name={member} size={memberAvatarSize} key={idx} />
            ))}
        </AvatarGroup>
    );

    const handleClickExit = () => {
        console.log("handleClickExit");
    };

    return (
        <div>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClickExit}
                        sx={{ height: 40 }}
                    >
                        Exit
                    </Button>

                    {avatarGroup}
                </Stack>
            </CardContent>

            <TextEditor send={sendWrapper} />
        </div>
    );
}

export default Room;
