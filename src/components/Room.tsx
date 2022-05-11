import React from "react";
import TextEditor from "./TextEditor";
import { sendWrapper } from "../utils/websocket";

function Room() {
    return (
        <div>
            <h1>Room</h1>

            <TextEditor send={sendWrapper} />
        </div>
    );
}

export default Room;
