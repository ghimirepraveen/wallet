const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  //auth/logic... user.....

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
      status: "failed ",
      message: " Authorization failed ! Invalid token !!",
    });
    return;
  }

  next();
};
module.exports = auth;
