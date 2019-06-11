const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //check token
  if (!token) {
    return res.status(401).json({
      message: "Token not found"
    });
  }
  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      message: "token not valid",
      error: e
    });
  }
}

module.exports = auth;
