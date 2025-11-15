import { app, BrowserWindow } from "electron";
import path from "path";
import { User } from "../shared";

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

const user: User = {
    firstname: "Backend",
    lastname: "User"
};
console.log(user);