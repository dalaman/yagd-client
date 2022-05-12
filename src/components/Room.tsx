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
import Chat from "./Chat";

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

    const [openChat, setOpenChat] = React.useState(false);

    const toggleChat =
        () => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setOpenChat(!openChat);
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

            <TextEditor send={sendWrapper} toggleChat={toggleChat} />

            <Chat openChat={openChat} toggleChat={toggleChat} />
        </div>
    );
}

export default Room;
