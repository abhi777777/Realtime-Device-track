 const express = require("express");
 const app = express();
 const http = require("http");
 const path = require("path");

 const socketio = require("socket.io"); // Correct module name
 const server = http.createServer(app);

 const io = socketio(server); // Corrected typo
 app.set("view engine", "ejs");
 app.use(express.static(path.join(__dirname, "public"))); // Corrected path join and method

 io.on("connection", function (socket) {
   socket.on("send-location", function (data) {
     io.emit("receive-location", { id: socket.id, ...data });
   });

   socket.on("disconnect", function () {
     io.emit("user-disconnected", socket.id);
   });
 });

 app.get("/", (req, res) => {
   res.render("index");
 });

 server.listen(3003, () => {
   console.log("Server is running on port 3003");
 });
