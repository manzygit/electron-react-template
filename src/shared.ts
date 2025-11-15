import { IpcRendererEvent } from "electron";

export interface ElectronReceiveCallback {
    (event: IpcRendererEvent, ...args: any): void;
}

export interface ElectronSendEvent {
    (channel: string, data?: any): void;
}

export interface ElectronReceiveEvent {
    (channel: string, callback: ElectronReceiveCallback): void;
}

export interface ElectronAPI {
    send: ElectronSendEvent;
    receive: ElectronReceiveEvent;
    once(channel: string, callback: ElectronReceiveCallback): void;
    remove(channel: string, callback: ElectronReceiveCallback): void;
    removeAll(channel: string): void;
}