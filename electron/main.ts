import * as path from "path";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { stat, readFile, writeFile } from "fs/promises";
import * as isDev from "electron-is-dev";

let mainWindow: BrowserWindow | null = null;

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

app.once("window-all-closed", () => app.quit());

// register tasks to be executed by the background process
function registerIpcHandlers(mainWindow: BrowserWindow) {
    ipcMain.handle("select-directory", () => {
        return dialog.showOpenDialog(mainWindow, {
            properties: ["openDirectory"],
        });
    });

    ipcMain.handle("select-file", function () {
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
}
