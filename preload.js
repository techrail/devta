/* eslint-disable no-undef */
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("IS_ELECTRON", true);
contextBridge.exposeInMainWorld("actions", {
  minimize: () => {
    ipcRenderer.invoke("minimize");
  },
  close: () => {
    ipcRenderer.invoke("close");
  },
  open: (link) => {
    ipcRenderer.invoke("open", link);
  },
});
