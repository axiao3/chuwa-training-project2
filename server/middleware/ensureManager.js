const jwt = require("jsonwebtoken");

exports.ensureManager = async function (req, res, next) {
  try {
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("cuurent user type:", decoded.type);
    if (decoded && decoded.type === "manager") {
      console.log("Authorized Manager!");
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
