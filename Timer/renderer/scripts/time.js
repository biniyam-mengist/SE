const electron=require('electron')
const ipc=electron.ipcRenderer;
microSecond=0;
second=0;
minute=0;
hour=0;
var timerCounting=false;


timerSecond=0;
timerMinute=0;
timerHour=0;

$(document).on("ready",function(){
    loadTime();
    loadTimer();
    moveBeaconTo("timer");
    toggleSectionTo("timer");
    showTip("scroll over the numbers to set time");

    

   function loadTime(){
        hour=hour<10?"0"+hour:hour;
        minute=minute<10?"0"+minute:minute;
        second=second<10?"0"+second:second;
        microSecond=microSecond<10?"0"+microSecond:microSecond;
        
        $("#hour").html(hour);
        $("#minute").html(minute);
        $("#second").html(second);
        $("#micro-second").html(microSecond);
   }
    
   function loadTimer(){
        timerHour=timerHour<10?"0"+timerHour:timerHour;
        timerMinute=timerMinute<10?"0"+timerMinute:timerMinute;
        timerSecond=timerSecond<10?"0"+timerSecond:timerSecond;
        
        $("#timer-hour").html(timerHour);
        $("#timer-minute").html(timerMinute);
        $("#timer-second").html(timerSecond);
   }



    $("#close-button").on("click",function(){
        console.log("ipc send");
        ipc.send('window-quit')
    })

    $("#minimize-button").on("click",function(){
        console.log("ipc send");
        ipc.send('window-minimize')
    })

    $("#maximize-button").on("click",maximize)

    

    function maximize(){
        console.log("ipc send");
        ipc.send('window-maximize');
        $("#title-bar").css({"-webkit-app-region":"no-drag"});
        $(this).attr('src',"../resources/images/unmaximize.png").off("click",maximize).on('click',unmaximize);
        $("#main-container").css({"border-radius":"0px"})
            
    }

    function unmaximize(){
        console.log("ipc send");
        ipc.send('window-unmaximize');
        $("#title-bar").css({"-webkit-app-region":"drag"});
        $(this).attr('src',"../resources/images/maximizexd.png").off("click",unmaximize).on('click',maximize);
        $("#main-container").css({"border-radius":"5px"})
        
    }


    $("#alarm-button").on('click',function(){
        destroyTip();
        moveBeaconTo("alarm");
        toggleSectionTo("alarm");
    })

    $("#timer-button").on('click',function(){
        destroyTip();
        moveBeaconTo("timer");
        toggleSectionTo("timer");
        if(!timerCounting)showTip("scroll over the numbers to set time");
    })

    $("#stopwatch-button").on('click',function(){
        destroyTip();
        moveBeaconTo("stopwatch");
        toggleSectionTo("stopwatch");
    })


    
    
    function moveBeaconTo(n){
        if (n=="alarm")$("#active-beacon").animate({"left":"52px"});
        else if (n=="timer")$("#active-beacon").animate({"left":"134px"});
        else if (n=="stopwatch")$("#active-beacon").animate({"left":"215px"});
    }

    function showTip(message){
        $("#direction").html(message).css({"display":"block"}).animate({"bottom":"0px"},"medium");
        tipTimeOut=setTimeout(function(){
            $("#direction").animate({"bottom":"-20px"},"medium",function(){
                $(this).css({"display":"none"})
            });
        },5500)

        
    }

    function destroyTip(){
        clearTimeout(tipTimeOut);
        $("#direction").stop().animate({"bottom":"-20px"},"fast").css({"display":"none"});
    }
    function moveLabels(type,dir){
        if (dir=="up") $("."+type+"-labels").animate({"padding-top":"0px"},"medium");
        else if (dir=="down") $("."+type+"-labels").animate({"padding-top":"15px"},"medium");
    }
    function toggleSectionTo(n){
        
        
        if (n=="alarm"){
            $("#alarm-body").css({"display":"flex"});
            $("#timer-body").css({"display":"none"});
            $("#stopwatch-body").css({"display":"none"});
            
        }
        
        else if (n=="timer"){
            $("#alarm-body").css({"display":"none"});
            $("#timer-body").css({"display":"flex"});
            $("#stopwatch-body").css({"display":"none"});
            
        }
        
        if (n=="stopwatch"){
            $("#alarm-body").css({"display":"none"});
            $("#timer-body").css({"display":"none"});
            $("#stopwatch-body").css({"display":"flex"});
            
        }
        
        
    }


    $("#start-button").on("click",function(){
        startCounting();
    });
    $("#reset-button").on("click",function(){
        hour=0;
        minute=0;
        second=0;
        microSecond=0;
        loadTime();
    })

    
    
    
    
    function startCounting(){
        moveLabels("stopwatch","down");
        $("#start-button").attr('src',"../resources/images/pause.png").off("click").on("click",stopCounting);
        secondCounterLoop=setInterval(countSecond,1000);
        microCounterLoop=setInterval(countMicroSecond,10);
        
    }

    function stopCounting(){
        
        moveLabels("stopwatch","up");
        clearInterval(secondCounterLoop);
        clearInterval(microCounterLoop);
        $("#start-button").attr('src',"../resources/images/start.png").off("click").on("click",startCounting);
    }
    


        function countSecond(){

            second++
            if(second==60){
                second=0;
                minute++;
                if(minute==60){
                    minute=0;
                    hour++;
                    hour=hour<10?"0"+hour:hour;
                    $("#hour").html(hour);
                }
                minute=minute<10?"0"+minute:minute;
                $("#minute").html(minute);
            }
            microSecond=0;
            second=second<10?"0"+second:second;
            $("#second").html(second);
        }

        function countMicroSecond(){
            microSecond++;
            microSecond=microSecond<10?"0"+microSecond:microSecond;
            $("#micro-second").html(microSecond);
            
                    
        }


      
        $("#timer-hour").on("mousewheel", changeHour=function(e){
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log("going up");
                timerHour++;
                if(timerHour==24)timerHour=0;
                timerHour=timerHour<10?"0"+timerHour:timerHour;
                $("#timer-hour").html(timerHour)
            }
            else{
                console.log('going down !');
                timerHour--;
                if(timerHour==-1)timerHour=24;
                timerHour=timerHour<10?"0"+timerHour:timerHour;
                $("#timer-hour").html(timerHour)
            }
        });

        $("#timer-minute").on("mousewheel", changeMinute=function(e){
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log("going up");
                timerMinute++;
                if(timerMinute==60)timerMinute=0;
                timerMinute=timerMinute<10?"0"+timerMinute:timerMinute;
                $("#timer-minute").html(timerMinute)
            }
            else{
                console.log('going down !');
                timerMinute--;
                if(timerMinute==-1)timerMinute=60;
                timerMinute=timerMinute<10?"0"+timerMinute:timerMinute;
                $("#timer-minute").html(timerMinute)
            }
        });


        $("#timer-second").on("mousewheel", changeSecond =function(e){
            if(e.originalEvent.wheelDelta /120 > 0) {
                console.log("going up");
                timerSecond++;
                if(timerSecond==60)timerSecond=0;
                timerSecond=timerSecond<10?"0"+timerSecond:timerSecond;
                $("#timer-second").html(timerSecond)
            }
            else{
                console.log('going down !');
                timerSecond--;
                if(timerSecond==-1)timerSecond=60;
                timerSecond=timerSecond<10?"0"+timerSecond:timerSecond;
                $("#timer-second").html(timerSecond)
            }
        });


        $("#timer-reset-button").on("click",function(){
            timerHour=0;
            timerMinute=0;
            timerSecond=0;
            loadTimer();
        })

        $("#timer-start-button").on("click",startCountingDown);
        



        
    
    function startCountingDown(){

        if(timerHour!=0 || timerSecond!=0 || timerMinute!=0){
            timerCounting=true;
            moveLabels("timer","down");
            $("#timer-start-button").attr('src',"../resources/images/pause.png").off("click").on("click",stopCountingDown);
            $("#timer-reset-button").hide();
            $("#timer-hour,#timer-minute,#timer-second").off("mousewheel").css({"background-color":"#151515"});
            timerSecondCounterLoop=setInterval(countTimerSecond,1000);
        }
        
    }


    function stopCountingDown(){
        timerCounting=false;
        moveLabels("timer","up");
        clearInterval(timerSecondCounterLoop);
        $("#timer-reset-button").show();       
        $("#timer-second").on("mousewheel",changeSecond);
        $("#timer-minute").on("mousewheel",changeMinute);
        $("#timer-hour").on("mousewheel",changeHour);
        $("#timer-hour,#timer-minute,#timer-second").css({"background-color":"#111"});
        $("#timer-start-button").attr('src',"../resources/images/start.png").off("click").on("click",startCountingDown);
    }
    


        function countTimerSecond(){

            timerSecond--
            if(timerSecond==-1){
                timerSecond=59;
                timerMinute--;
                if(timerMinute==-1){
                    timerMinute=59;
                    timerHour--;
                    if(timerHour==-1){
                        console.log("ended");
                        stopCountingDown();
                        timerHour=0;
                        timerMinute=0;
                        timerSecond=0;
                        loadTimer();
                        notifyCompletion();
                        return;
                    }
                    timerHour=timerHour<10?"0"+timerHour:timerHour;
                    $("#timer-hour").html(timerHour);
                }
                timerMinute=timerMinute<10?"0"+timerMinute:timerMinute;
                $("#timer-minute").html(timerMinute);
            }
            timerSecond=timerSecond<10?"0"+timerSecond:timerSecond;
            $("#timer-second").html(timerSecond);
        }

        function notifyCompletion(){
            

         
        ipc.send('time-over');

        }





        ipc.on('stop-audio',_=>function(){
            // audio.pause();
            console.log("stop audio recieved")
        })


        // -------------------timer--------------


    
    

})