const { app, BrowserWindow, Menu } = require("electron");

const server = require("./index");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    title: 'IS2 Solutions',
    icon: __dirname + '/public/img/favicon.ico'
  });

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
  mainWindow.maximize()
  Menu.setApplicationMenu(mainMenu)
}

app.on("ready", createWindow);

app.on("resize", function (e, x, y) {
  mainWindow.setSize(x, y);
  mainWindow.maximize()
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
  
});




