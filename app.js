const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "https://expenses-app-frontend-18c65f34b93b.herokuapp.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Simple Get Request to see if Backend is app
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Beckend App.",
  });
});

//Authentication Routes
const authRutes = require("./app/routes/auth.route");
app.use("/api/auth", authRutes);

//Expenses Routes
const expensesRoutes = require("./app/routes/expenses/expenses.route");
app.use("/api/expenses", expensesRoutes);

//User Routes
const userRoutes = require("./app/routes/users/user.routes");
app.use("/api/user", userRoutes);

//UserRole Routes
const userRoleRoutes = require("./app/routes/users/userRole.routes");
app.use("/api/userRole", userRoleRoutes);

module.exports = app;
