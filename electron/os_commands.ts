type OsCommands = {
    [name: string]: { win: string; lin: string };
};

const osCommands: OsCommands = {
    run_child_process: {
        win: "java",
        lin: "java",
    },
    get_java_pid: {
        win: `tasklist /FI "IMAGENAME eq java.exe" /FO LIST | findstr "PID:`,
        lin: "ps xao pid,comm | grep java | grep -o '[0-9]*'",
    },
    kill: {
        win: "taskkill /F /PID",
        lin: "kill",
    },
};

export default osCommands;
