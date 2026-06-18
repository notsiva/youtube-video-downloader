const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const formatsRoute = require("./routes/formats");
const downloadRoute = require("./routes/download");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

app.use("/formats", formatsRoute);
app.use("/download", downloadRoute);

server.listen(5000, () => {
  console.log("Server running on 5000");
});
