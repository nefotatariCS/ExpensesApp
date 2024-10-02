const userService = require("../../services/user/user.service");
const { logError, logInfo } = require("../../common/addLogs");

const getAllUsers = async (req, res) => {
  try {
    logInfo("We are at get all users controller");
    const allUsers = await userService.getAllUser();
    const response = {
      users: allUsers,
      totalRecords: allUsers.length,
    };
    res.status(200).json(response);
  } catch (error) {
    logError("Error fetching users", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    logInfo("We are at get user by id controller", req.params.userId);
    const userById = await userService.getUserById(userId);
    if (!userById) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      res.status(200).json(userById);
    }
  } catch (error) {
    logError("Error fetching user by id", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function updateUserById(req, res) {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  logInfo(`We are at updateUserById in controller. The user id is : ${userId}`);
  try {
    const updatedUser = await userService.updateUserById(
      userId,
      updatedUserData,
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    logError(`Error at updateUserById. Error is : ${error}`);
    res
      .status(500)
      .json({ message: "Internal Server Error while updating user" });
  }
}

const disableUser = async (req, res) => {
  const { userId } = req.params;
  logInfo(
    `We are at disableUser in controller. User to be disabled is ${userId}`,
  );
  try {
    const updatedUser = await userService.disableUser(userId);

    if (!updatedUser) {
      logError("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User disabled successfully" });
  } catch (error) {
    logError(`Error in disableUser. Error is: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  disableUser,
};
