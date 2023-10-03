const { app, BrowserWindow, session, ipcMain, shell } = require("electron");
const url = require("url");
const isDev = require("electron-is-dev");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    icon: "./dist/logo.png",
    frame: false,
    minHeight: 600,
    minWidth: 850,
    webPreferences: {
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: isDev,
    },
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["default-src 'self' 'unsafe-eval' data:"],
      },
    });
  });

  win.removeMenu();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "dist/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  win.maximize();
  win.show();
  if (isDev) {
    win.openDevTools();
  }
};

app.whenReady().then(() => {
  if (isDev) {
    console.log(`You are running the electron app on dev.`);
    console.log(`Live changes is not handled`);
    console.log(`Each change requires new build`);
    console.log(
      `Use npm run dev command and once you are happy with the result`
    );
    console.log(`then build and then run this command again`);
  }
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("minimize", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.handle("maximize", () => {
  BrowserWindow.getFocusedWindow().maximize();
});

ipcMain.handle("close", () => {
  BrowserWindow.getFocusedWindow().close();
});

ipcMain.handle("open", (event, link) => {
  shell.openExternal(link);
});
