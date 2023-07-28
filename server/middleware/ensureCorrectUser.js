const jwt = require("jsonwebtoken");

exports.ensureCorrectUser = async function (req, res, next) {
  try {
    // console.log("req.headers: ", req.headers);
    // console.log("req.body: ", req.body);
    const token = req.headers.authorization;
    // console.log("token: ", token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded: ", decoded);

    if (decoded && decoded.id === req.body.user) {   
      console.log("Authorized Correct User!");
      return next();
    } else {
      return next({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }
};
