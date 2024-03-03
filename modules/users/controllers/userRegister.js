const mongoose = require("mongoose");
//encryption
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const Users = mongoose.model("users");

  const { name, email, password, balance, address } = req.body;
  //validation

  //creation code
  const encPassword = await bcrypt.hash(password, 10);
  try {
    const createUser = await Users.create({
      name,
      email,
      password: encPassword,
      balance,
      address,
    });
  } catch (e) {
    res.status(400).json({
      status: e.message,
    });
    return;
  }
  res.status(200).json({
    message: "succesfully registered ",
  });
};

module.exports = userRegister;
