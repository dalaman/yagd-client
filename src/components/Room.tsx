import React from "react";
import {
    AvatarGroup,
    Button,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";
import TextEditor from "./TextEditor";
import Avatar from "./Avatar";
import Chat from "./Chat";
import { spawnChildProcess, killChildProcess } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const title = "Room";

const memberList = ["Alice", "Bob", "Chris", "David", "Elizabeth"];

function Room() {
    const maxAvatarDisplay = 4;
    const memberAvatarSize = 35;
    const navigate = useNavigate();

    const avatarGroup = (
        <AvatarGroup max={maxAvatarDisplay}>
            {memberList.map((member: string, idx: number) => (
                <Avatar name={member} size={memberAvatarSize} key={idx} />
            ))}
        </AvatarGroup>
    );

    // TODO: notify exit
    const handleClickExit = () => {
        console.log("handleClickExit");
        killChildProcess();
        navigate("/");
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

    React.useEffect(() => {
        spawnChildProcess();
    }, []);

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

            <TextEditor toggleChat={toggleChat} />

            <Chat openChat={openChat} toggleChat={toggleChat} />
        </div>
    );
}

export default Room;
