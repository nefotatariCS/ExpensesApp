const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const controller = require("../../controllers/expenses/expense.controller");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/getAll", [authJwt.verifyToken], controller.getAll);

router.get(
  "/getExpenseById/:expenseId",
  [authJwt.verifyToken],
  controller.getExpenseById
);

router.post("/addNew", [authJwt.verifyToken], controller.addNew);

router.post(
  "/updateExpensesById/:expenseId",
  [authJwt.verifyToken],
  controller.updateExpensesById
);

module.exports = router;
