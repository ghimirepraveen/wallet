const expres = require("express");
const mongoose = require("mongoose");
const user_Router = require("./modules/users/users.routes");
const incomeRouter = require("./modules/users/income/income.routes");
const expenseRouter = require("./modules/expsense/expsense.routes");

require("dotenv").config();
const app = expres();
//app.use(express.json());
app.use(expres.json());

//models

require("./model/user.model");
require("./model/TRANSACTION.model");
//mongoos connection
mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => {
    console.log("Connected to DB!!");
  })
  .catch((e) => {
    console.log("connection failed!!!");
  });
//routerss
app.use("/users", user_Router); //user_router is imported

app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

//server
app.listen(8080, () => {
  console.log("server start");
});
