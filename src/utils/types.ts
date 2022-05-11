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
