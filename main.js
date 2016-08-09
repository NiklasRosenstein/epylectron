var electron = require('electron')
var child_process = require('child_process')
var request_promise = require('request-promise')
var mainWindow = null
var pythonRuntime = null
var mainAddr = 'http://127.0.0.1:5000';

electron.app.on('ready', function() {
  // Create the Python process.
  pythonRuntime = child_process.spawn('python', ['./backend/main.py'], {
    stdio: 'inherit',
    detached: false
  })

  // Create the main window.
  mainWindow = new electron.BrowserWindow({width: 500, height: 300})
  mainWindow.on('closed', function() {
    mainWindow = null
    pythonRuntime.kill('SIGINT')
    electron.app.quit();
  })
  mainWindow.loadURL(mainAddr)
})
