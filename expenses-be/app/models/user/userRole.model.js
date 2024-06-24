module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define("userRoles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userRoleName: {
      type: Sequelize.STRING,
    },
    userRoleDescription: {
      type: Sequelize.STRING,
    },
    isUserRoleActive: {
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

  return UserRole;
};
