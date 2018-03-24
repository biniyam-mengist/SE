var express = require("express");
var app = express();

app.use("/",express.static("public"));

app.get("/",(req, res)=>{
    res.status(200).sendFile(__dirname+"/view/index.html");
});
app.listen(3000,function(){
    console.log("server running at 3000");
})