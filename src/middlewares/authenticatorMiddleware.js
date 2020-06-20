
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const response = require("../utils/response");

const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer", "").trim();

  const decoded = jwt.verify(token, jwtSecret);

  const user = await User.findOne({
    _id: decoded.id,
  });

  if (!user) {
    throw new Error();
  }
  req.token = token;
  req.user = user;
  next();

  if (!token) {
    res.send(response("Please authenticate!", error));

  }
}


module.exports = auth;
