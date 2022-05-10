import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Room from "./components/Room";
import NormalEditor from "./components/NormalEditor";
import Settings from "./components/Settings";

const theme = createTheme({
    typography: {
        button: {
            textTransform: "none",
        },
    },
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
                <Header />

                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/normal_editor" element={<NormalEditor />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
