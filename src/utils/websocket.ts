import { Protocol, ProtocolHeaderType } from "./types";

const PORT = "8080"; // FIXME: port num
const rand = Math.floor(Math.random() * 10000 + 1);
const WHOAMI = "Alice" + rand; // FIXME: name

const webSocket = new WebSocket(`ws://127.0.0.1:${PORT}`);

webSocket.onopen = () => {
    const myname = "Alice"; // FIXME: name
    sendChat(myname + " joined");
};

webSocket.onmessage = (event) => {
    console.log(event.data);
    const parsed = JSON.parse(event.data);
    if (parsed.header.type === "CHAT")
        receive(parsed.header.name, parsed.content);
    // else if (parsed.header.type === "TEXT") updateText(parsed.content);
    // else if (parsed.header.type === "CURSOR") updateCursor(parsed.content);
    else console.error("Unknown type " + parsed.type);
};

export const sendWrapper = (
    headerType: ProtocolHeaderType,
    content: string
) => {
    const req: Protocol = {
        header: {
            name: WHOAMI,
            type: headerType,
        },
        content: content,
    };
    webSocket.send(JSON.stringify(req));
    console.log("SEND:", JSON.stringify(req));
};

const sendChat = (message: string) => {
    if (!message) message = "thisismessage";
    if (message === "") return;

    sendWrapper(/* type= */ "CHAT", /* content= */ message);
};

const receive = (name: string, message: string) => {
    console.log("receive:", name, message);
};
