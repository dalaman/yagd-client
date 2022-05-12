import { Protocol, ProtocolHeaderType } from "./types";
import { WHOAMI, URL } from "./config";

export const webSocket = new WebSocket(URL);

webSocket.onopen = () => {
    const message = `${WHOAMI} joined`;
    sendWrapper(/* type= */ "CHAT", /* content= */ message);
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
    console.log("SEND:", req);
};
