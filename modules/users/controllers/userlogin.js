const mongoose = require("mongoose");
//encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userlogin = async (req, res) => {
  const Users = mongoose.model("users");
  const { email, password } = req.body;
  //validation
  try {
    if (!email) throw "please provide email";
    if (!password) throw "please provide password";
    const getUser = await Users.findOne({
      email: email,
    });

    if (!getUser) throw "User doesnot exist";
    const matched = await bcrypt.compare(password, getUser.password);
    if (!matched) throw "emailand password does not match";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e,
    });
    return;
  }
  //jwt
  const getUserforaccesstoken = await Users.findOne({
    email: email,
  });
  const accestoken = jwt.sign(
    {
      _id: getUserforaccesstoken._id,
      email: getUserforaccesstoken.email,
      name: getUserforaccesstoken.name,
    },
    process.env.jwt_salt,
    { expiresIn: "90 days" }
  );

  res.status(200).json({
    status: "user logged in successfully ",
    accestoken,
  });
};

module.exports = userlogin;
