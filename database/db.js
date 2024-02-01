const mongoose = require("mongoose");

mongoose.connect(process.env.mongoURL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

connection.on("error", () => {
  console.log("Mongo DB Connection failed");
});

module.exports = mongoose;