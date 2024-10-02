module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "P0kuj3m3r",
  DB: "ExpensesApp",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
