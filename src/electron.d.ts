export interface ElectronAPI {
    send: (channel: string, data: any) => void;
    receive: (channel: string, func: Function) => void;
}

declare global {
    interface Window {
        electron: ElectronAPI
    }
}