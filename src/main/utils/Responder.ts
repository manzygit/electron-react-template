import { ipcMain, IpcMainEvent } from "electron";

export class RespondEvent<T extends string> {
    private type: T;
    private event: IpcMainEvent;

    constructor(type: T, event: IpcMainEvent) {
        this.type = type;
        this.event = event;
    }
    send(type: T, ...args): void {
        this.event.sender.send(type, ...args);
    }
    reply(...args: any[]): void {
        this.send(this.type, ...args);
    }
}

export interface OnCommandCallback<T extends string> {
    (event: RespondEvent<T>, ...args): void;
}

export default class Responder<T extends string> {
    public onCommand(command: T, callback: OnCommandCallback<T>): void {
        ipcMain.on(command, function(event, ...args){
            callback(new RespondEvent<T>(command, event), ...args);
        });
    }
}