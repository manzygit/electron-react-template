import { ReactElement } from "react";
import './App.scss';
import { CommandType } from "./Electron";

window.electronAPI.invoke<CommandType>({
    command: "add",
    args: ["sladkslakdlaskd", "lsakdlskad"]
}, function(data: string){
    console.log(data);
});

export default function App(): ReactElement {
    return (
        <div className="app">
            <h1>Vite + React + Typescript</h1>
        </div>
    );
}