type OsCommands = {
    [name: string]: { win: string; lin: string };
};

const osCommands: OsCommands = {
    run_child_process: {
        win: "java",
        lin: "java",
    },
    get_java_pid: {
        win: "echo NO IMPL",
        lin: "ps xao pid,comm | grep java | grep -o '[0-9]*'",
    },
    kill: {
        win: "taskkill.exe /PID",
        lin: "kill",
    },
};

export default osCommands;
