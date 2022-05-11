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
