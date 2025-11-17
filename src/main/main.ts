import { app, BrowserWindow, ipcMain, session, shell } from "electron";
import path from "path";

const isDev = process.env.NODE_ENV === 'development' || process.env.VITE_DEV_SERVER_URL !== undefined;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            devTools: isDev,
            allowRunningInsecureContent: false,
            webSecurity: true,
            sandbox: true
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
        win.setMenuBarVisibility(false);
        win.removeMenu();

        win.webContents.on('before-input-event', (event, input) => {
            if (input.key === 'F5' || 
                (input.control && input.key === 'r') ||
                (input.control && input.shift && input.key === 'r')) {
                event.preventDefault();
            }
            if (input.control && input.shift && input.key === 'i') {
                event.preventDefault();
            }
            if (input.key === 'F12') {
                event.preventDefault();
            }
        });

        win.webContents.on('context-menu', (event) => {
            event.preventDefault();
        });
    }

    // Prevent opening new windows (both dev and prod)
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            shell.openExternal(url);
        }
        return { action: 'deny' };
    });
    
    // Prevent navigation to external protocols (combined into one listener)
    win.webContents.on('will-navigate', (event, url) => {
        const allowedOrigins = isDev 
            ? ['http://localhost:5173', 'file://']
            : ['file://'];
        
        if (!allowedOrigins.some(origin => url.startsWith(origin))) {
            event.preventDefault();
            // Open external HTTP(S) links in default browser
            if (url.startsWith('http://') || url.startsWith('https://')) {
                shell.openExternal(url);
            }
        }
    });
}

function setupIpcHandlers() {
    // Remove old listeners if they exist (prevents duplicate handlers)
    ipcMain.removeAllListeners("sayHi");
    
    ipcMain.on("sayHi", function(event) {
        event.sender.send("hello", "Hello From Electron Backend!");
    });
}

app.whenReady().then(function(){
    setupIpcHandlers();
    if(!isDev){
        session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
            callback({
                responseHeaders: {
                    ...details.responseHeaders,
                    'Content-Security-Policy': ["default-src 'self'"]
                }
            });
        });
    }
    createWindow();
});

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

app.on('will-quit', () => {
    ipcMain.removeAllListeners();
});