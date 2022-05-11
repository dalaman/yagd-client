import React from "react";
import Editor from "@monaco-editor/react";
import {
    Alert,
    Button,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import * as monaco from "monaco-editor";
import useWindowSize from "../utils/useWindowSize";
import { ProtocolHeaderType } from "../utils/types";
import {
    readFile,
    writeFile,
    openFilePicker,
    openFolderDirectory,
} from "../utils/utils";
import {
    editorTheme,
    defaultText,
    availableLanguageList,
} from "../utils/config";
// import ICursorPositionChangedEvent from "monaco-editor";

type Props = {
    send?: (a: ProtocolHeaderType, b: string) => void;
};

function TextEditor(props: Props) {
    const bottomMargin = 250;
    const [innerWidth, innerHeight] = useWindowSize();

    // filename
    const [filename, setFilename] = React.useState("");
    const [errorFilename, setErrorFilename] = React.useState(false);

    const isValidFilename = (filename: string) => {
        const regex = /^[A-Za-z0-9.]+$/;
        return regex.test(filename) || filename === "";
    };

    const handleChangeFilename = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const filename = event.target.value;

        const valid = isValidFilename(filename);
        if (valid) {
            setFilename(filename);
        } else {
            console.log("bad filename");
        }
        setErrorFilename(!valid);
    };
    // end filename

    // language
    const [language, setLanguage] = React.useState("");

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    };
    // end language

    // editor method
    const editorRef = React.useRef<any>(null); // COMBAK: remove any

    const handleEditorChange = (text: string | undefined) => {
        if (text) {
            console.log(text);

            if (props.send) props.send(/* type= */ "TEXT", /* content= */ text);
        }
    };

    // const handleCursorChange = (arg: typeof ICursorPositionChangedEvent) => {
    const handleCursorChange = (arg: any) => {
        // COMBAK: remove any
        console.log(arg.position);

        if (props.send)
            props.send(/* type= */ "CURSOR", /* content= */ arg.position);
    };

    const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        editor.onDidChangeCursorPosition(handleCursorChange);
    };
    // end editor method

    const handleClickSave = async () => {
        const dir = await openFolderDirectory();

        if (dir) {
            const text = editorRef.current?.getValue();
            await writeFile(dir, filename, text);
            setAlertMessage("Saved successfully");
            setOpenSnackbar(true);
        } else {
            console.log("aborted");
        }
    };

    const loadFile = async () => {
        const filepath = await openFilePicker();

        if (filepath) {
            const text = await readFile(filepath);
            editorRef.current?.getModel().setValue(text);
        } else {
            console.log("aborted");
        }
        setOpenDialog(false);
    };

    // dialog for load file button
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const dialog = (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Load file?"}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Make sure this text has saved properly.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        After loading another file, this text cannot be
                        restored.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={loadFile} autoFocus>
                        Load
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    // end dialog

    // alert
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };
    // end alert

    const menu = (
        <CardContent>
            <Stack direction="row" spacing={5} alignItems="baseline">
                <Stack direction="row" spacing={1}>
                    <IconButton
                        aria-label="save"
                        onClick={handleClickSave}
                        disabled={errorFilename || filename === ""}
                    >
                        <Tooltip title="Save" placement="top">
                            <SaveIcon />
                        </Tooltip>
                    </IconButton>

                    <IconButton
                        aria-label="load"
                        onClick={() => setOpenDialog(true)}
                    >
                        <Tooltip title="Load" placement="top">
                            <FileOpenIcon />
                        </Tooltip>
                    </IconButton>
                </Stack>

                <Stack direction="row" spacing={1}>
                    <TextField
                        variant="standard"
                        label="Filename"
                        onChange={handleChangeFilename}
                        error={errorFilename}
                        helperText={errorFilename ? "Bad filename" : ""}
                    />

                    <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                    >
                        <InputLabel id="demo-select-small">Language</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={language}
                            label="Age"
                            onChange={handleChangeLanguage}
                        >
                            {availableLanguageList.map(
                                (lang: string, idx: number) => (
                                    <MenuItem key={idx} value={lang}>
                                        {lang}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </CardContent>
    );

    return (
        <div>
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                sx={{ minWidth: 300 }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                autoHideDuration={3000}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>

            {dialog}

            {menu}

            <Editor
                height={innerHeight - bottomMargin}
                theme={editorTheme}
                language={language}
                loading={<CircularProgress />}
                defaultValue={defaultText}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
            />
        </div>
    );
}

export default TextEditor;
