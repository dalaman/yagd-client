import { Protocol, ProtocolHeaderType } from "./types";
import { WHOAMI, URL } from "./config";

const webSocket = new WebSocket(URL);

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
