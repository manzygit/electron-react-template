export {};

declare global {
    interface Window {
        electronAPI: typeof import('./preload/preload.ts').ElectronAPI;
    }
}