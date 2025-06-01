export {};

declare global {
    interface Window {
        ElectronAPI: typeof import('./main/preload').ElectronAPI;
    }
}