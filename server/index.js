const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const socketIO = require("socket.io");

const route = require("./routes/route");
const { PORT } = require("./utils/constants");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// mongodb connection
const conn = require("./db/connection.js");

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = socketIO(server);

app.use(route(io));
