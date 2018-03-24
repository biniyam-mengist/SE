var accentColor = "#0078ab";
var secondaryColor = "#fff"


function fixHeader(){
            
    if ( document.documentElement.scrollTop>4){
        $("header").css({"background-color":"white", "color":accentColor,
         "box-shadow": "0px 4px 12px rgba(37, 37, 37, 0.404)" });
        $("#sign-in").css({"border-color":accentColor})
        console.log("fixed");
    }
    else {
        $("header").css({"background-color":"transparent", "color":secondaryColor,
        "box-shadow": "none"});
        $("#sign-in").css({"border-color":secondaryColor});
        console.log("loose");
    }

}


function showSignin(){
    $("#modalBg").css({"display":"flex"});
}