import React from "react";
import Editor from "@monaco-editor/react";
import {
    CardContent,
    CircularProgress,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    InputLabel,
    MenuItem,
    FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import SaveIcon from "@mui/icons-material/Save";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import * as monaco from "monaco-editor";
// import ICursorPositionChangedEvent from "monaco-editor";
import useWindowSize from "../utils/useWindowSize";
import { ProtocolHeaderType } from "../utils/types";

const editorTheme = "vs-dark";
// const language = "javascript";
const defaultValue = `// type somthing below\n
const func = () => {
    console.log("Hey, howdy!");
}`;

type Props = {
    send?: (a: ProtocolHeaderType, b: string) => void;
};

const languageList = ["txt", "javascript"];

function TextEditor(props: Props) {
    const bottomMargin = 180;

    const [innerWidth, innerHeight] = useWindowSize();

    // filename
    const [filename, setFilename] = React.useState("tmp");

    // TODO: add varidation
    const handleChangeFilename = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFilename(event.target.value);
    };
    // end filename

    // language
    const [language, setLanguage] = React.useState("");

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguage(event.target.value);
    };
    //end language

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
        editor.onDidChangeCursorPosition(handleCursorChange);
    };

    const menu = (
        <CardContent>
            <Stack direction="row" spacing={5} alignItems="flex-end">
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Save" placement="top">
                        <IconButton aria-label="save">
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Load" placement="top">
                        <IconButton aria-label="load">
                            <FileOpenIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Stack direction="row" spacing={1}>
                    <TextField
                        variant="standard"
                        label="Filename"
                        onChange={handleChangeFilename}
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
                            {languageList.map((lang: string, idx: number) => (
                                <MenuItem key={idx} value={lang}>
                                    {lang}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </CardContent>
    );

    return (
        <div>
            {menu}

            <Editor
                height={innerHeight - bottomMargin}
                theme={editorTheme}
                language={language}
                loading={<CircularProgress />}
                defaultValue={defaultValue}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
            />
        </div>
    );
}

export default TextEditor;
