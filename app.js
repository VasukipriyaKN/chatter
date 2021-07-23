var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var socket = require("socket.io")
var app = express()

// Global Variables
var userName = ""
var name = ""
var nameArray = []
var messageArray = []


// Initial Setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname))

// Server Setup
var server = app.listen(3000, function(){
    console.log("Server started at port 3000")
})

// Socket.io Setup
var io = socket(server)

// Socket receive
io.on('connection', function(socket){
    
    socket.on('names', function(nameData){
        name = nameData.name
        io.sockets.emit('names',nameData)
    })
    socket.on('message', function(messageData){
        console.log(messageData)
        io.sockets.emit('message',messageData)
    })
})

// document.getElementById("eachName").setAttribute("value",messageData.name)



// Get Requests
app.get("/",function(req,res){
    res.render("enter", {errDisplayName:""})
})
app.get("/chatroom",function(req,res){
    res.render("chatRoom", {userName: nameArray,senderMessage: messageArray})
})

// Post Requests
app.post("/", function(req,res){
    userName = req.body.displayName;
    if(userName !== "")
        res.redirect("/chatroom")
    else
        res.render("enter",{errDisplayName: "Please enter display name"})
})



// mongoose.connect("mongodb://localhost:27017/chatterdb", {useNewUrlParser: true, useUnifiedTopology: true});
// const chatScheme = new mongoose.Schema({
//     uniqueId: String,
//     name: String
// });

// const chat = new mongoose.Model("Chat", chatScheme);



// Chat.find({}, function(err, returnMsg){
    //     })
    // app.post("/", function(req, res){
        //     var newMsg = req.body.eachMsg;
        //     const msg = new Chat({
            //         message: newMsg
            //     });
            //     msg.save();
            
            //     res.redirect("/");
            // })