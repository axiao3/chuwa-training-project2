const Token = require("../models/token");
const User = require("../models/user");
const Application = require("../models/application");

exports.getRegistrationHistory = async function (req, res, next) {
  try {
    // Fetch all the tokens
    const tokens = await Token.find({})
      .select("registrationLink email token")
      .exec();

    console.log("tokens", tokens);
    const result = [];

    // Loop over the tokens to gather the required information
    for (let token of tokens) {
      const user = await User.findOne({ token: token.token })
        .select("username applicationStatus")
        .exec();
      // const application = await Application.findOne({
      //   email: token.email,
      // }).exec();
      console.log("user: ", user);

      const isSubmitted = (user && user.applicationStatus !== "never submitted") ? true : false;

      result.push({
        registrationLink: token.registrationLink,
        email: token.email,
        username: user ? user.username : null, // return null if no user is found with the token
        isSubmitted: isSubmitted,
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.log("error: ", err);
    return next(err);
  }
};
