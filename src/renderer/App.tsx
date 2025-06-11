import { ReactElement } from "react";
import './App.scss';
import { FirstInterface } from "./SomeInterfaces";

const data: FirstInterface = {
    doSomething: function(){
        console.log("Hello From App.tsx");
    }
}

export default function App(): ReactElement {
    data.doSomething();
    return (
        <div className="app">
            <h1>Vite + React + Typescript</h1>
        </div>
    );
}