const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
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
app.get('/',(req,res,next)=>{
  res.send("hi")
})
module.exports = app;
