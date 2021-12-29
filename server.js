// includint the require packages
const http = require("http");
const app = require("./app");
const socketIO = require("socket.io");
const ConnectDb = require("./backend/config/db");
const User = require("./backend/Models/UsersModel");

// creating temprary users array

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

IO.on("connection", (socket) => {
  socket.on("joined", ({ user, id }) => {
    console.log(user + " joined");
    socket.emit("welcome", {
      user: "admin",
      message: `welcome ${user}.`,
      id: "admin",
    });
    socket.broadcast.emit("userJoined", {
      user: "admin",
      message: `${user} is joined`,
      id,
    });
  });

  socket.on("chat message", async (msg) => {
    console.log(msg);
    const user = await User.findById(msg.userId);
    user.messages.push({ newMsg: msg.message });
    user.save();
    IO.emit("sendMessage", {
      message: msg.message,
      id: msg.userId,
      user: `${msg.firstName} ${msg.lastName}`,
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leaved", { user: "Admin", message: "user is left" });
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
