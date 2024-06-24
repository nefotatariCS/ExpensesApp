const { logInfo, logError } = require("../../common/addLogs");
const userRoleService = require("../../services/user/userRole.service");

exports.getAllUserRoles = async (req, res) => {
  try {
    logInfo("We are at getAllUserRoles in controller");
    const allUserRoles = await userRoleService.getAllUserRole();
    const response = {
      userRoles: allUserRoles,
      totalRecord: allUserRoles.length,
    };
    res.status(200).json(response);
  } catch (error) {
    logError(`Error in getAllUserRoles. Error is: ${error}`);
    res
      .status(500)
      .json({ message: "Internal Server Error While getting all User Roles" });
  }
};

exports.getAllActiveUserRoles = async (req, res) => {
  try {
    logInfo("We are at getAllActiveUserRoles in controller");
    const allUserRoles = await userRoleService.getAllActiveUserRole();
    const response = {
      userRoles: allUserRoles,
      totalRecord: allUserRoles.length,
    };
    res.status(200).json(response);
  } catch (error) {
    logError(`Error in getAllActiveUserRoles. Error is: ${error}`);
    res
      .status(500)
      .json({ message: "Internal Server Error While getting all User Roles" });
  }
};

exports.getUserRolesById = async (req, res) => {
  try {
    const userRoleId = req.params.userRoleId;
    logInfo(
      `We are at getUserRolesById in controller. User roles id is: ${userRoleId}`
    );
    const userRoleById = await userRoleService.getUserRoleById(userRoleId);
    if (userRoleById) {
      res.status(200).json(userRoleById);
    } else {
      logError("User Role not found");
      res.status(404).json({ message: "User role not found" });
    }
  } catch (error) {
    logError(`Error in getUserRolesById. Error is: ${error}`);
    res
      .status(500)
      .json({ message: "Internal Server Error While getting all User Roles" });
  }
};
