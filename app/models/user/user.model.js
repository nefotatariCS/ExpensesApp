module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    isUserActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    deactivateReason: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    activateReason: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return User;
};
