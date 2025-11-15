import { useEffect, useState } from "react";
import './App.scss';

export default function App() {
    useEffect(function(){
        window.electron.send("sayHi");
        window.electron.once("hello", function(_, msg) {
            console.log(msg);
        });
    }, []);
    
    
    let [count, setCount] = useState(0);

    return (
        <div className="app">
            <h1>Hello World!</h1>
            <div className="count">
                <span className="label">Balance: </span>
                <span>${count}</span>
            </div>
            <button onClick={function(){
                setCount(count + Math.round(Math.random() * 100));
            }} className="gain">Gain Money</button>
            <button onClick={function(){
                setCount(0);
            }} className="lose">Withdraw</button>
        </div>
    );
}