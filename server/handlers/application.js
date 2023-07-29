const Application = require("../models/application");

exports.createApplication = async function (req, res, next) {
    try {
      console.log("data: ", req.body);
      const item = await Application.create(req.body);
      return res.status(200).json(item);
    } catch (err) {
      console.log("error: ", err)
      return next(err);
    }
  };