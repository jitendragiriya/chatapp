// includint the require packages
const http = require("http");
const app = require("./app");
const socketIO = require("socket.io");
const ConnectDb = require("./backend/config/db");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// importing the configuration file when app is not in production.
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./backend/config/config.env" });
}
// conneting the database.
ConnectDb();

const Errors = require("./backend/Middlewares/Errors");
app.use(Errors);
// server listening
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const IO = socketIO(server);

let users = [];

const adduser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeuser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getusers = (userId) => {
  return users.find((user) => user.userId === userId);
};

IO.on("connection", (socket) => {
  socket.on("adduser", ({ user }) => {
    adduser(user, socket.id);
    IO.emit("onlineUser", users);
  });

  socket.on("sendMessage", async ({ senderId, recieverId, message }) => {
    const user = await getusers(recieverId);
    IO.to(user.socketId).emit("getMessage", {
      senderId,
      message,
      createdAt:Date.now(),
    });
  });

  socket.on("disconnect", () => {
    removeuser(socket.id);
    IO.emit("onlineUser", users);
    socket.broadcast.emit("leaved", { user: "Admin", message: "user is left" });
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`error:${err.message}`);
  console.log("sutting down the server due to unhandled promis rejection.");
  server.close(() => {
    process.exit(1);
  });
});
