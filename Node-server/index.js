let express = require("express");
let app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const path = require("path");
const mainfile = path.join(__dirname, "../");
const port = 8000;

app.use(express.static(mainfile));

app.get("/", function (req, res) {
  res.sendFile(mainfile + "/index.html");
});

const activeusers = {};

io.on("connection", (socket) => {
  //for user join
  socket.on("new_user_joined", (username) => {
    console.log("new user", username);
    activeusers[socket.id] = username;
    socket.broadcast.emit("User-Joined", username);

    // for user leave
    socket.on("disconnect", () => {
      console.log("left user", username);
      activeusers[socket.id] = username;
      socket.broadcast.emit("User-left", username);
    });
  });

  //receiving message from client
  socket.on("send", (message) => {
    //broadcasting the message
    socket.broadcast.emit("recieve", {
      message: message,
      username: activeusers[socket.id],
    });
  });
});

http.listen(port, () => {
  console.log(`server running at port ${port}`);
});
