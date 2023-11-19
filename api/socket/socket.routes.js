module.exports = connectSockets;

function connectSockets(io) {
  io.on("connection", (socket) => {
    socket.on("chat connectChat", (megaChatPage) => {
      if (socket.megaChatPage) {
        socket.leave(socket.megaChatPage);
      }
      socket.join(megaChatPage);
      socket.megaChatPage = megaChatPage;
    });
    socket.on("chat addMsg", (msg) => {
      io.to(socket.megaChatPage).emit("chat addMsg", msg);
    });
    socket.on("chat showTyping", (loggedUser) => {
      io.to(socket.megaChatPage).emit("chat showTyping", loggedUser);
    });
  });
}
