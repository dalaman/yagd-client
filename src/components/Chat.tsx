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
import { sliceSplit } from "../utils/utils";
// import { sendWrapper } from "../utils/websocket";
import { webSocket, sendWrapper } from "../utils/websocket";

type Props = {
    openChat: boolean;
    toggleChat: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

function Chat(props: Props) {
    const maxCharPerLine = 20;

    const [message, setMessage] = React.useState("");

    const [chatElementList, setChatElementList] = React.useState<
        Array<ChatElement>
    >([]);

    // HACK: duplicate onmessage
    webSocket.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        if (parsed.header.type === "CHAT") {
            receiveChat(parsed.header.name, parsed.content);
            console.log("RECEIVE", parsed);
        }
    };

    const receiveChat = (name: string, message: string) => {
        const date = new Date();
        const now = date.toLocaleTimeString("ja-JA", {
            hour: "2-digit",
            minute: "2-digit",
        });

        const newElement: ChatElement = {
            time: now,
            from: name,
            message: message,
        };

        const chatElementListTmp = chatElementList;
        chatElementListTmp.push(newElement);
        setChatElementList(chatElementListTmp);
        update();
    };

    const handleChangeMessage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setMessage(event.target.value);
    };

    const handleClickSend = () => {
        if (message !== "") {
            sendWrapper(/* type= */ "CHAT", /* content= */ message);
            setMessage(""); // clear
        }
    };

    // XXX:
    const [foo, setFoo] = React.useState(0);
    const update = () => {
        setFoo(foo + 1);
    };
    React.useEffect(() => {
        if (foo % 2 === 1) {
            update();
        }
    }, [foo]);
    // end XXX

    const header = (
        <Card sx={{ maxWidth: 300 }}>
            <CardHeader title="Chat" sx={{ width: 300 }} />
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
                                <ListItemText primary={chatElement.from} />
                                <ListItemText secondary={chatElement.time} />
                            </Stack>

                            {sliceSplit(
                                /* str= */ chatElement.message,
                                /* length= */ maxCharPerLine
                            ).map((str: string, idx: number) => (
                                <ListItemText
                                    key={idx}
                                    sx={{ my: -0.3 }}
                                    primary={"> " + str}
                                />
                            ))}
                        </Stack>
                    </ListItem>

                    <Divider sx={{ mt: 1 }} />
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
                value={message}
                onChange={handleChangeMessage}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleClickSend();
                    }
                }}
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
