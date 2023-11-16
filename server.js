const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3030;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Express App Config
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "puki muki secret stuff",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const corsOptions = {
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));

const authRoutes = require("./api/auth/auth.routes");
const addUserRoutes = require("./api/user/user.route");
const addRoomRoutes = require("./api/room/room.route");
const connectSockets = require("./api/socket/socket.routes");

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", addUserRoutes);
app.use("/api/room", addRoomRoutes);
connectSockets(io);

http.listen(port, () => {
  `listening on http://localhost:${port}`;
});
