export type NewOrJoin = "New" | "Join";

export type ProtocolHeaderType = "CHAT" | "TEXT" | "CURSOR";

export type ProtocolHeader = {
    name: string;
    type: ProtocolHeaderType;
};

export type Protocol = {
    header: ProtocolHeader;
    content: string;
};

export type ChatElement = {
    time: string;
    from: string;
    message: string;
};

export type CursorPosition = {
    lineNumber: number;
    column: number;
};

export type CursorUserDict = {
    [name: string]: CursorPosition;
};
