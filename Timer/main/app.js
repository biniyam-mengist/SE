var electron= require("electron");
var ipc =electron.ipcMain;
var app = electron.app;
var browserWindow = electron.BrowserWindow;
let appWindow, notifWindow;
let Tray = electron.Tray;
var Menu =  electron.Menu;
var hasTray=false;

app.on("ready", function(){
        appWindow = new browserWindow({
        width:700,
        height:500,
        frame:false,
        transparent:true,
        minWidth:500,
        minHeight:300,
        
    });
    appWindow.loadURL("file://"+__dirname+"/../renderer/html/time.html");
    launchTray();
    
})

function launchTray(){
    const tray = new Tray(__dirname +"/../renderer/resources/images/cup.png");
    const contextMenu=Menu.buildFromTemplate([
        {
            label: "Exit",
            click:_=>app.quit()
            
        },
        
    ]);
    tray.setContextMenu(contextMenu);

    tray.on('click',_=>{
        if(appWindow.isVisible())appWindow.hide();
        else appWindow.show();

    });
}

ipc.on("window-quit",_=>{

    appWindow.hide();
});


ipc.on("window-minimize",_=>{
    appWindow.minimize()
})

ipc.on("window-maximize",_=>{
    appWindow.maximize()
})

ipc.on("window-unmaximize",_=>{
    appWindow.unmaximize()
})

ipc.on("time-over",_=> {
    notifWindow= new browserWindow({
        width:510,
        height:60,
        frame:false,
        transparent:true,
        y:0,
        x:710,
        alwaysOnTop:true,
        resizable:false,
        parent:appWindow,
        modal:true,
    })
    notifWindow.loadURL("file://"+__dirname+"/../renderer/html/notification.html");
    notifWindow.height = 300;

    // notifLoop=setInterval(function(){
    //     notifWindow.y+=1;
    //     // if(notifWindow.y>29)clearInterval(notifLoop);
    // },100);

})

ipc.on('closed',function(event){
    notifWindow.close();
    appWindow.send('stop-audio')

})

