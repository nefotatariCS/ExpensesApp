module.exports = (sequelize, Sequelize) => {
  const expenses = sequelize.define("expenses", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    currency: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: {
      type: Sequelize.DECIMAL(15, 3),
      allowNull: false,
    },
    transactionDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deactivateReason: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    transactionStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    transactionStatusChanged: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  return expenses;
};
