const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("files"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
const user = require("./backend/routes/UserRoute"); 
// api
app.use("/api", user);
// app.use("/api", friend);
// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
// });

module.exports = app;
