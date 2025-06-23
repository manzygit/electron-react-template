import { contextBridge, ipcRenderer } from "electron";
import { SecondInterface } from "./SomeInterfaces";

const data: SecondInterface = {
    doSomething: function(){
        console.log("Hello From Preload.ts");
    }
};

export const ElectronAPI = {
    buttonClicked: function(): void {
        ipcRenderer.send("buttonClicked", "Hello World!");
    }
};

data.doSomething();
contextBridge.exposeInMainWorld("ElectronAPI", ElectronAPI);