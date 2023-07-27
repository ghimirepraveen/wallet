const mongoose = require("mongoose");
const transitionSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: [true, "Amount is requred"],
    },
    remarks: {
      type: String,
      required: [true, "Remarks is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user id is required !!"],
    },
    transition_type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, " transition_type is required"],
    },
  },

  {
    timestamps: true,
  }
);

const userModel = mongoose.model("transaction", transitionSchema);
module.exports = userModel;
