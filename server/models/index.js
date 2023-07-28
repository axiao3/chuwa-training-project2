const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose
  .connect(process.env.MONGODB_URI, {
    // keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => console.log("Connected"));

module.exports.User = require("./user");
module.exports.Token = require("./token");
module.exports.Application = require("./application");
