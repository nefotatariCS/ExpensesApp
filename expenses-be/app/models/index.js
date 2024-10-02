const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user/user.model.js")(sequelize, Sequelize);
db.userRole = require("../models/user/userRole.model.js")(sequelize, Sequelize);

db.userRole.hasMany(db.user, { as: "userRole" });

db.SYSTEMROLES = ["operator", "admin"];

db.expenses = require("../models/expenses/expense.model.js")(
  sequelize,
  Sequelize,
);

db.user.hasMany(db.expenses, { as: "expenseId" });

module.exports = db;
