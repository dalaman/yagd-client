import React from "react";
import {
    Card,
    CardHeader,
    Divider,
    Fab,
    List,
    ListItem,
    ListItemText,
    TextField,
    Stack,
    SwipeableDrawer,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatElement } from "../utils/types";

const chatElementList = [
    {
        time: "10:00",
        from: "Alice",
        message: "Hello, World",
    },
    {
        time: "10:01",
        from: "Bob",
        message: "lalala",
    },
];

type Props = {
    openChat: boolean;
    toggleChat: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Chat(props: Props) {
    const [message, setMessage] = React.useState("");

    const handleChangeMessage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMessage(event.target.value);
    };

    const handleClickSend = () => {
        if (message !== "") {
            console.log(message);
            setMessage(""); // clear
        }
    };

    const header = (
        <Card sx={{ width: 300 }}>
            <CardHeader title="Chat" />
        </Card>
    );

    const content = (
        <List>
            {chatElementList.map((chatElement: ChatElement, idx: number) => (
                <div key={idx}>
                    <ListItem key={idx}>
                        <Stack direction="column">
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="baseline"
                            >
                                <ListItemText
                                    primary={chatElement.from}
                                ></ListItemText>

                                <ListItemText
                                    secondary={chatElement.time}
                                ></ListItemText>
                            </Stack>

                            <ListItemText
                                primary={"> " + chatElement.message}
                            ></ListItemText>
                        </Stack>
                    </ListItem>

                    <Divider />
                </div>
            ))}
        </List>
    );

    const input = (
        <Stack direction="row" spacing={1} sx={{ my: 2 }}>
            <TextField
                variant="outlined"
                label="Message"
                size="small"
                sx={{ ml: 1 }}
                multiline={true}
                value={message}
                onChange={handleChangeMessage}
            />

            <Fab
                size="small"
                color="primary"
                onClick={handleClickSend}
                aria-label="send"
            >
                <SendIcon />
            </Fab>
        </Stack>
    );

    return (
        <div>
            <React.Fragment key="left">
                <SwipeableDrawer
                    anchor="right"
                    open={props.openChat}
                    onClose={props.toggleChat()}
                    onOpen={props.toggleChat()}
                >
                    {header}
                    {content}
                    {input}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default Chat;
