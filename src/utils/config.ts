import {getWebsocketPort} from "./utils";

const PORT = getWebsocketPort();

export const editorTheme = "vs-dark";

export const defaultText = `// type somthing below\n\n`;

export const availableLanguageList = ["txt", "javascript", "typescript"];

const rand = Math.floor(Math.random() * 10000 + 1);

export const WHOAMI = "Alice" + rand; // FIXME: name
export const URL = `ws://127.0.0.1:${PORT}`;

export const joiningMessageSuffix = " joined";
