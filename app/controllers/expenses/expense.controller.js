const { logInfo, logError } = require("../../common/addLogs");
const expensesService = require("../../services/expenses/expense.service");

const getAll = async (req, res) => {
  try {
    logInfo("We are at getAll in controller");
    const allExpensess = await expensesService.getAll();
    const response = {
      expenses: allExpensess,
      totalRecords: allExpensess.length,
    };
    res.status(200).json(response);
  } catch (error) {
    logError(`Error in getAll. Error is ${error}`);
    throw new Error("Error fetching expenses from service", error);
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    logInfo("We are at getExpenseById  controller", expenseId);
    const expenseById = await expensesService.getExpenseById(expenseId);
    if (!expenseById) {
      res.status(404).json({ message: "Expense Not Found" });
    } else {
      res.status(200).json(expenseById);
    }
  } catch (error) {
    logError("Error fetching expense by id", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addNew = async (req, res) => {
  try {
    logInfo(`We are at addNew in controller. The new expense is: ${req.body}`);
    const expensesData = {
      description: req.body.description,
      currency: req.body.currency,
      amount: req.body.amount,
      transactionDate: req.body.transactionDate,
      transactionStatus: "ToPay",
    };

    const expense = expensesService.addNew(expensesData);
    res
      .status(200)
      .json({ message: "New expense was added successfully", expense });
  } catch (error) {
    logError(`Error in addNew. Error is ${error}`);
    throw new Error("Error adding new expenses from servise", error);
  }
};

const updateExpensesById = async (req, res) => {
  const expenseId = req.params.expenseId;
  const updatedExpenseData = req.body;
  console.log("tesssss", expenseId, updatedExpenseData);
  logInfo(
    `We are at updateExpensesById at controller. Updated expense is  ${updatedExpenseData}`,
  );
  try {
    const updatedExpense = await expensesService.updateExpenseById(
      expenseId,
      updatedExpenseData,
    );
    res.status(200).json(updatedExpense);
  } catch (error) {
    logError(`Error at updateExpensesById in controller. Error is: ${error}`);
    res
      .status(500)
      .json({ message: "Internal Server Error while updating expense" });
  }
};

module.exports = { getAll, addNew, getExpenseById, updateExpensesById };
