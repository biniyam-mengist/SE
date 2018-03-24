const electron=require('electron')
const ipc=electron.ipcRenderer;



audio= new Audio("../resources/audio/upwards.mp3");
            audio.play();
            setInterval(function(){console.log("playing two");audio.play()},2500);


function sendClose(){
    console.log("sentt")
    ipc.send('closed')
}