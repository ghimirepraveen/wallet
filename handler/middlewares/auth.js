const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({
      status: "failed",
      message: "authorization failed ! you must logged in!",
    });
    return;
  }

  const token = authorizationHeader.split("Bearer ")[1];
  try {
    const checktoken = jwt.verify(token, process.env.jwt_salt);

    req.user = checktoken;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "Token is not valid or jwt.verify failed",
    });
    return;
  }

  next();
};
module.exports = auth;
