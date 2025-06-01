import { contextBridge, ipcRenderer } from "electron";

export const ElectronAPI = {
    buttonClicked: function(): void {
        ipcRenderer.send("buttonClicked", "Hello World!");
    }
};

console.log("Hello World!");

contextBridge.exposeInMainWorld("ElectronAPI", ElectronAPI);