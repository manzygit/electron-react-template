import { ReactElement } from "react";
import './App.scss';
import { FirstInterface } from "./SomeInterfaces";
import { CommandType } from "./Electron";

const data: FirstInterface = {
    doSomething: function(){
        console.log("Hello From App.tsx");
    }
}

window.electronAPI.invoke<CommandType>({
    command: "add",
    args: ["sladkslakdlaskd", "lsakdlskad"]
}, function(data: string){
    console.log(data);
});

export default function App(): ReactElement {
    data.doSomething();
    return (
        <div className="app">
            <h1>Vite + React + Typescript</h1>
        </div>
    );
}