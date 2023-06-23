const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const conn = mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => {
    console.log("Database Connected");
    return db;
  })
  .catch((err) => {
    console.log("Connection Error");
  });

module.exports = conn;
