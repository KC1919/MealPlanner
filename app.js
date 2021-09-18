const express = require("express");
const cookieParser=require("cookie-parser");
const userModel = require("./models/userModel");
// Server: // route  -> request -> response/file
// File system// path -> interact/type -> file /folder
// server init
const app = express();
// post accept
app.use(express.static("public"));
app.use(express.json());
// function -> route  path
// frontend -> req -> /
app.use(cookieParser());

const userRouter=require("./routers/userRouter");
const authRouter=require("./routers/authRouter");

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


// ---------------------------------------------------------

//localhost:8080 ??
app.listen(8080 || 3000, function () {
  console.log("server started");
});
// / port, ip,localhost
