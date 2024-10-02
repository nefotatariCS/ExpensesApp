const { logInfo, logError } = require("../../common/addLogs");
const db = require("../../models");
const UserRole = db.userRole;

async function getAllUserRole() {
  try {
    logInfo("We are at getAllUserRolein service");
    const allUserRoles = await UserRole.findAll();
    if (!allUserRoles) {
      logError("User role not found");
      throw new Error("User role not found");
    }

    return allUserRoles;
  } catch (error) {
    logError(`Error in getAllUserRole. Error is ${error}`);
    throw new Error("Error while fetching user role");
  }
}

async function getAllActiveUserRole() {
  try {
    logInfo("We are at getAllActiveUserRole in service");
    const allUserRoles = await UserRole.findAll({
      where: {
        isUserRoleActive: true,
      },
    });
    if (!allUserRoles) {
      logError("User role not found");
      throw new Error("User role not found");
    }

    return allUserRoles;
  } catch (error) {
    logError(`Error in getAllActiveUserRole. Error is ${error}`);
    throw new Error("Error while fetching user role");
  }
}

async function getUserRoleById(userRoleId) {
  try {
    logInfo(
      `We are at getUserRoleById in service. User role id is: ${userRoleId}`,
    );
    const userRole = await UserRole.findByPk(userRoleId);
    if (!userRole) {
      logError("User Role not found");
      throw new Error("User not found");
    }

    return userRole;
  } catch (error) {
    logError(`Error in getUserRoleById. Error is ${error}`);
    throw new Error("Error while fetching user role");
  }
}

module.exports = {
  getUserRoleById,
  getAllActiveUserRole,
  getAllUserRole,
};
