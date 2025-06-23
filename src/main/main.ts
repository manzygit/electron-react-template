import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils/utils";
import Responder from "./utils/Responder";
import { CommandType } from "./Electron";

let mainWindow: BrowserWindow = null;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.resolve(__dirname, "../preload/preload.js")
        },
        autoHideMenuBar: !isDev()
    });
    if (isDev()) {
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(path.resolve(__dirname, "../renderer/index.html"));
        mainWindow.setMenu(null);
    }
    mainWindow.on("close", function () {
        mainWindow = null;
        process.exit(1);
    })

    const responder: Responder<CommandType> = new Responder();
    responder.onCommand("add", function(event, ...args){
        console.log("Add comand Triggered!");
        event.reply(`You added something: ${args}`);
    });

    ipcMain.on("buttonClicked", function (sender, msg) {
        console.log(msg);
    })
}

app.on("ready", function () {
    createWindow();
});

app.on("window-all-closed", function () {
    if (process.platform === "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});