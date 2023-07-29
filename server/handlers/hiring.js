const Token = require("../models/token");
const User = require("../models/user");
const Application = require("../models/application");

exports.getRegistrationHistory = async function (req, res, next) {
  try {
    // Fetch all the tokens
    const tokens = await Token.find({})
      .select("registrationLink email token")
      .exec();

    // An array to hold the result
    const result = [];

    // Loop over the tokens to gather the required information
    for (let token of tokens) {
      const user = await User.findOne({ token: token.token })
        .select("username")
        .exec();
      const application = await Application.findOne({
        email: token.email,
      }).exec();

      const isSubmitted = application ? true : false;

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
