const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const route = require("./routes/route");
const { PORT } = require("./utils/constants");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// mongodb connection
const conn = require("./db/connection.js");
app.use(route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
