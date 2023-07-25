const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected"));

module.exports.Employee = require("./employee");
