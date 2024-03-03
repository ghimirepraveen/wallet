const express = require("express");
const mongoose = require("mongoose");
const user_Router = require("./modules/users/users.routes");
const incomeRouter = require("./modules/users/income/income.routes");
const expenseRouter = require("./modules/expsense/expsense.routes");

require("dotenv").config();
const app = express();
app.use(express.json());

require("./model/user.model");
require("./model/TRANSACTION.model");

mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connected to DB!!");
  })
  .catch((e) => {
    console.log("connection failed!!!");
  });

app.use("/users", user_Router);

app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

//server
app.listen(8080, () => {
  console.log("Please handle code with care!! ❤️");
  console.log("ctrl +c to terminate server!!");

  console.log("server start");
});
