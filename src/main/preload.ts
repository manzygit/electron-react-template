import { contextBridge, ipcRenderer } from "electron";
import { ElectronAPI, ElectronReceiveCallback } from "../shared";

let electronAPI: ElectronAPI = {
    send: (channel: string, data?: any) => {
        ipcRenderer.send(channel, data ?? "");
    },
    receive: (channel: string, callback: ElectronReceiveCallback) => {
        ipcRenderer.on(channel, (event, ...args) => {
            return callback(event, ...args);
        });
    },
    once: (channel, callback) => {
        ipcRenderer.once(channel, (event, ...args) => callback(event, ...args));
    },
    remove: (channel, callback) => {
        ipcRenderer.removeListener(channel, callback);
    },
    removeAll: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
}

contextBridge.exposeInMainWorld('electron', electronAPI);