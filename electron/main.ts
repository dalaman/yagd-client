import * as path from "path";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { readFile, writeFile } from "fs/promises";
import * as isDev from "electron-is-dev";
import * as WebSocket from "ws";
import { spawn, execSync, ChildProcessWithoutNullStreams } from "child_process";
import osCommands from "./os_commands";

const PORT = 8080;
const JAVA_CLIENT_NAME = "BackendProcess";
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
let javaClientPid: string | null = null; // child process of node childPrcess

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

    const allJavaPids = getJavaPid(); // get non-yagd java process  e.g. eclipse...

    let options: Array<string> = [];

    if (isDev) {
        options = ["-classpath", "./bin", JAVA_CLIENT_NAME];
    } else {
        options = ["-classpath", "./resources/bin", JAVA_CLIENT_NAME];
    }

    childProcess = spawn(
        /* command= */ osCommands.run_child_process[platform],
        /* args= */ [...options, String(PORT)],
        /* opt= */ {
            shell: true,
        }
    );

    childProcess?.stdout.on("data", (data) => {
        console.log(String(data));
        const allJavaPidsWithYagd = getJavaPid(); // get (non-yagd + yagd) java proess

        javaClientPid = allJavaPidsWithYagd.filter(
            (x) => !allJavaPids.includes(x)
        )[0];
        console.log("javaClientPid:", javaClientPid);
    });

    childProcess?.stderr.on("data", (data) => {
        console.error(String(data));
    });
};

const getJavaPid = () => {
    try {
        const rtn = String(execSync(osCommands.get_java_pid[platform]));
        console.log("all java pid:", rtn);
        let allJavaPids: Array<string> = [];

        if (platform === "win") {

            for (const line of rtn.split("\n")){
                let numbers = "";
            for (const c of line){
                if (
                    (!isNaN(Number(c)))
                    &&(c!==" ")
                    &&(c!=="\r")
                ) numbers += c;
            }
            allJavaPids.push(numbers);
        }
        } else {
            allJavaPids = rtn.split("\n");
        }
        allJavaPids.pop(); // pop last ""
        console.log("allJavaPids:", allJavaPids);
        return allJavaPids;
    } catch {
        // if no java process, shell returns 1
        console.log("no java ps found");
        return [];
    }
};

const killChildProcess = () => {
    console.log("killChildProcess called in main.ts");

    if (javaClientPid) {
        const cmd = osCommands.kill[platform] + " " + javaClientPid;

        try {
            execSync(cmd);
            console.log("javaClient ps killed successfully");

            childProcess?.kill("SIGHUP");
        } catch {
            // if no java process, shell returns 1
            console.log("javaClient ps cannot be killed");
        }
    }
    childProcess = null;
    javaClientPid = null;
};
