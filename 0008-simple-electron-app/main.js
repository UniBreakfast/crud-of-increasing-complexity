const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => new BrowserWindow(
  { width: 800, height: 600, webPreferences: { nodeIntegration: true } }
).loadFile('index.html'))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
