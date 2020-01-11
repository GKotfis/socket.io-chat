var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http, { perMessageDeflate: false });

app.set("port", process.env.PORT || 3000);
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket) {
  console.log("user connected");

  socket.on("chat message", function(msg) {
    console.log("message: " + msg);

    io.emit("chat message", msg);
  });
});

http.listen(process.env.PORT || 3000, function() {
  console.log("> listening on *:%d", process.env.PORT || 3000);
});
