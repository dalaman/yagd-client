// COMBAK: remove any
const _window = window as any;

export const openFilePicker = async () => {
    const res = await _window.electron.selectFile();

    if (!res.canceled) {
        return res.filePaths[0];
    }
    return false;
};

export const openFolderDirectory = async () => {
    const res = await _window.electron.selectDirectory();

    if (!res.canceled) {
        return res.filePaths[0];
    }
    return false;
};

export const writeFile = async (
    dir: string,
    filename: string,
    text: string
) => {
    const absPath = _window.electron.pathJoin(dir, filename);
    await _window.electron.writeFile(absPath, text);
};

export const readFile = async (filepath: string) => {
    return await _window.electron.readFile(filepath, "utf8");
};

export const sliceSplit = (str: string, length: number) => {
    const splitted: Array<string> = [];

    while (str.length > length) {
        splitted.push(str.slice(0, length));
        str = str.slice(length);
    }

    splitted.push(str);
    return splitted;
};

export const spawnChildProcess = async (url: string, port: string) => {
    console.log("spawnChildProcess called in uitls.ts");
    return await _window.electron.spawnChildProcess(url, port);
};

export const killChildProcess = async () => {
    console.log("killChildProcess called in uitls.ts");
    return await _window.electron.killChildProcess();
};

export const getWebsocketPort = () => {
    return _window.electron.websocketPort;
};
