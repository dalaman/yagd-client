import * as path from "path";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { readFile, writeFile } from "fs/promises";
import * as isDev from "electron-is-dev";
import * as WebSocket from "ws";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

const PORT = 8080;
const platform = process.platform === "win32" ? "win" : "lin";

// websocket server ( <===> [ReactComp & BackendProcess.java] as client)
const server = WebSocket.Server;
const s = new server({
    port: PORT,
});

s.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
        console.log("\nReceived\n" + message);

        // send another client
        // e.g. if message from BackendProcess.java, then send to ReactComp
        // vice versa
        s.clients.forEach((client: WebSocket) => {
            if (client !== ws) client.send(String(message));
        });
    });
});
// end websocket server

let mainWindow: BrowserWindow | null = null;
let childProcess: ChildProcessWithoutNullStreams | null = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    registerIpcHandlers(mainWindow);

    if (process.env.NODE_ENV === "development") {
        mainWindow.webContents.openDevTools({ mode: "detach" });
    }

    if (isDev) {
        mainWindow.loadURL("http://localhost:3000/index.html");
    } else {
        mainWindow.loadFile(path.join(__dirname, "../index.html"));
    }
};

app.whenReady().then(async () => {
    createWindow();
});

app.once("window-all-closed", () => {
    app.quit();
    killChildProcess();
});

// register tasks to be executed by the background process
function registerIpcHandlers(mainWindow: BrowserWindow) {
    ipcMain.handle("select-directory", () => {
        return dialog.showOpenDialog(mainWindow, {
            properties: ["openDirectory"],
        });
    });

    ipcMain.handle("select-file", () => {
        return dialog.showOpenDialog(mainWindow, {
            properties: ["openFile"],
            filters: [{ name: "*", extensions: ["*"] }],
        });
    });

    ipcMain.handle(
        "read-file",
        async (event, filePath: string, encoding?: BufferEncoding) => {
            return await readFile(filePath, { encoding });
        }
    );

    ipcMain.handle(
        "write-file",
        async (event, filePath: string, content: string | Buffer) => {
            return await writeFile(filePath, content);
        }
    );

    ipcMain.handle("spawn-child-process", () => {
        return spawnChildProcess();
    });

    ipcMain.handle("kill-child-process", () => {
        return killChildProcess();
    });
}

const spawnChildProcess = () => {
    if (childProcess) return;

    console.log("spawnChildProcess called in main.ts");

    const filepath = path.join("scripts", "run_child_process");

    if (platform === "win") {
        childProcess = spawn(filepath + ".bat", [String(PORT)], {
            shell: true,
        });
    } else if (platform === "lin") {
        childProcess = spawn("bash", [filepath + ".sh", String(PORT)], {
            shell: true,
        });
    }

    childProcess?.stdout.on("data", (data) => {
        console.log(String(data));
    });

    childProcess?.stderr.on("data", (data) => {
        console.error(String(data));
    });
};

const killChildProcess = () => {
    console.log("killChildProcess called in main.ts");
    // childProcess.kill("SIGHUP");
    childProcess = null;
};
