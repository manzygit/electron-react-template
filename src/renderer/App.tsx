import { useEffect } from "react";

export default function App() {
    useEffect(function(){
        window.electron.send("sayHi");
        window.electron.once("hello", function(_, msg) {
            console.log(msg);
        });
    }, []);

    return (
        <div className="app">
            <h1>Hello World!</h1>
        </div>
    );
}