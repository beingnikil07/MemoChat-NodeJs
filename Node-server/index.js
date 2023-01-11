let express = require('express');
let app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');
const mainfile = path.join(__dirname, '../')
//mainfile will contain all the required file     
const port = 8000;

app.use(express.static(mainfile));
// static is a built-in middleware in express.js. It serve the static files like here mainfile is static file

app.get("/", function (req, res) {
    res.sendFile(mainfile + '/index.html');
})
// Abhi mai isko empty rakh rha hu ,yha users add hote jaayenge baad mai
const activeusers = {};
io.on("connection", (socket) => {
    socket.on("new_user_joined", (username) => {     //receiving username from client
        console.log("new user", username);
        activeusers[socket.id] = username;
        //pehli id mai pehle username save ho jaayega aur dusri mai dusra mean jitne bhi active users hai 
        //ye unko array kii form mai save krr ke rakhega 
        socket.broadcast.emit("User-Joined", username);
        //jaise he koi user join kiya to ye emit fire ho lega aur humko ye mil jaayega 
        //isko hum client side se edit karenge   

        // for user leave 
        socket.on("disconnect", () => {
            console.log("User-left", username);
        })

    })
})

http.listen(port, () => {
    console.log(`server running at port ${port}`);
})


