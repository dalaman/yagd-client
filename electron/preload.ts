import * as path from "path";
import { ipcRenderer, contextBridge } from "electron";

export default interface API {
    readFile: (
        filePath: string,
        option?: BufferEncoding
    ) => Promise<Buffer | string>;
    writeFile: (
        filePath: string,
        content: string | Buffer
    ) => Promise<undefined>;
    selectDirectory: () => Promise<Dialog>;
    selectFile: () => Promise<Dialog>;
    pathJoin: (dir: string, filename: string) => string;
    spawnChildProcess: (
        socket_url: string,
        socket_port: string
    ) => Promise<void>;
    killChildProcess: () => Promise<void>;
    websocketPort: number;
}

async function readFile(filePath: string): Promise<Buffer>;
async function readFile(
    filePath: string,
    encoding: BufferEncoding
): Promise<string>;
async function readFile(
    filePath: string,
    option?: BufferEncoding
): Promise<Buffer | string> {
    return ipcRenderer.invoke("read-file", filePath, option) as Promise<
        Buffer | string
    >;
}

async function writeFile(
    filePath: string,
    content: string | Buffer
): Promise<undefined> {
    return ipcRenderer.invoke(
        "write-file",
        filePath,
        content
    ) as Promise<undefined>;
}

type Dialog = {
    canceled: boolean;
    filePaths: string;
};

const selectDirectory = async () => {
    return (await ipcRenderer.invoke("select-directory")) as Promise<Dialog>;
};

const selectFile = async () => {
    return (await ipcRenderer.invoke("select-file")) as Promise<Dialog>;
};

const pathJoin = (dir: string, filename: string) => {
    return path.join(dir, filename);
};

const spawnChildProcess = async (socket_url: string, socket_port: string) => {
    return (await ipcRenderer.invoke(
        "spawn-child-process",
        socket_url,
        socket_port
    )) as Promise<void>;
};

const killChildProcess = async () => {
    return (await ipcRenderer.invoke("kill-child-process")) as Promise<void>;
};

const websocketPort:number =ipcRenderer.sendSync("websocket-port");

const api: API = {
    readFile,
    writeFile,
    selectDirectory,
    selectFile,
    pathJoin,
    spawnChildProcess,
    killChildProcess,
    websocketPort,
};

contextBridge.exposeInMainWorld("electron", api);
