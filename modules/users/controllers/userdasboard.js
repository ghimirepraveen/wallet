const mongoose = require("mongoose");
const userDashboard = async (req, res) => {
  const Users = mongoose.model("users");
  const Transaction = mongoose.model("transaction");

  const getTransaction = await Transaction.find({
    user_id: req.user._id,
  })
    .sort("-createdAt")
    .select("remarks amount transaction_type")
    .limit(5);

  const getUserdata = await Users.findOne({
    email: req.user._id,
  }).select("balance name");

  res.status(200).json({
    data: getUserdata,
    Transaction: getTransaction,
  });
};
module.exports = userDashboard;
