const { createServer } = require("http")
const { Server } = require("socket.io")
const httpServer = createServer();
const io = new Server(httpServer, {
  // options
  path: "/uibuilder/vendor/socket.io/"
});

io.of("/uibtest2").on("connection", (socket) => {
  console.log("socket connected");
  socket.emit("hello")
});

httpServer.listen(7000);
