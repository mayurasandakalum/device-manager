require("dotenv").config({ path: "./config.env" });

const PORT = process.env.PORT || 8080;

module.exports = { PORT };
