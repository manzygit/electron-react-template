import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import path from "path";

const isDev = process.env.NODE_ENV === 'development' || process.env.VITE_DEV_SERVER_URL !== undefined;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    if(isDev){
        win.loadURL('http://localhost:5173');
        win.webContents.openDevTools();
        process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    } else {
        win.loadFile(path.resolve(
            app.getAppPath(), 'dist', "index.html"
        ));
    }

    ipcMain.on("sayHi", function(event) {
        event.sender.send("hello", "Hello From Electron Backend!");
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function() {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on("activate", function() {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});