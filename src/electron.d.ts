/// <reference types="vite/client" />

import type { ElectronAPI } from "./shared";

declare global {
    interface Window {
        electron: ElectronAPI
    }
}