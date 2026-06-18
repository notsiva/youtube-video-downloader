const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let backendProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "YouTube Downloader",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setMenuBarVisibility(false);

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../frontend/dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  if (!app.isPackaged) {
    backendProcess = spawn("node", ["backend/server.js"], { stdio: "ignore" });
  }

  createWindow();
});

app.on("before-quit", () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
