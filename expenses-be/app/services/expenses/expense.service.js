const { logInfo, logError } = require("../../common/addLogs");
const db = require("../../models");
//const { Op } = require("sequelize");
const Expenses = db.expenses;

async function getAll() {
  try {
    logInfo("We are at getAll in service!");
    const allExpensess = await Expenses.findAll();
    if (!allExpensess) {
      logError("Expenses not found");
      throw new Error("Expenses not found");
    }
    return allExpensess;
  } catch (error) {
    logError(`Error in getAll. Error is ${error}`);
    throw new Error("Error retriving all expenses from database", error);
  }
}

async function getExpenseById(expenseId) {
  try {
    logInfo(
      `We are at getExpenseById in service. Expense id is : ${expenseId}`
    );
    const expenseById = await Expenses.findByPk(expenseId);
    return expenseById || null;
  } catch (error) {
    logError(`Error in getExpenseById. Error is ${error}`);
    throw new Error("Error while fetching expense");
  }
}
async function addNew(expenseData) {
  try {
    logInfo(`We are at addNew in service. New transaction is ${expenseData}`);
    const expense = Expenses.create(expenseData);
    return expense;
  } catch (error) {
    logError(`Error in addNew. Error is ${error}`);
    throw new Error("Error Adding new expense", error);
  }
}

async function updateExpenseById(expenseId, updatedExpenseData) {
  try {
    logInfo(
      `We are at updateExpenseById in service. The Expenses id is: ${expenseId}`
    );

    const expense = await Expenses.findByPk(expenseId);
    console.log("this ecisttt", expense);
    if (!expense) {
      logError("Expenses not found");
      throw new Error("Expenses not found");
    }
    await expense.update(updatedExpenseData);

    const updatedExpneses = await Expenses.findByPk(expenseId);

    return updatedExpneses;
  } catch (error) {
    logError(`Error in updateExpenseById. Error is: ${error}`);
    throw new Error("Error updating expenses by ID", error);
  }
}

module.exports = {
  getAll,
  addNew,
  getExpenseById,
  updateExpenseById,
};
