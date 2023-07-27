const express = require("express");
const auth = require("/Users/prabinmac/Desktop/project /node /wallet /handler/middlewares/auth.js");
const addExpense = require("./controllers/addexpense");
const expenseRouter = express.Router();

expenseRouter.use(auth);

expenseRouter.post("/add", addExpense);
module.exports = expenseRouter;
