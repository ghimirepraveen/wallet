const mongoose = require("mongoose");

const addExpense = async (req, res) => {
  Users = mongoose.model("users");
  Transaction = mongoose.model("transaction");
  const { amount, remarks } = req.body;

  try {
    if (!amount) throw "Please provide amount !!";
    if (amount < 1) throw "Amount should not be less then one ";
    if (!remarks) throw "remarks should  be provided  ";
    if (remarks.length < 2) throw "Remarks should be more than 2 letters";
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e,
    });
    return;
  }
  //if success
  try {
    ////create transation history !!!!
    await Transaction.create({
      amount: amount,
      remarks: remarks,
      user_id: req.user._id,
      transition_type: "expense",
    });

    await Users.updateOne(
      {
        _id: req.user._id,
      },
      {
        $inc: {
          balance: amount * -1,
        },
      },
      {
        runValidators: true,
      }
    );
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
    return;
  }

  res.status(200).json({
    status: "Expense was added",
  });
};
module.exports = addExpense;
