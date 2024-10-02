const { logInfo, logError } = require("../../common/addLogs");
const db = require("../../models");
const User = db.user;

async function getAllUser() {
  try {
    logInfo("We are at getAllUser in service");
    const allUsers = await User.findAll({
      where: {
        isUserActive: true,
      },
    });
    if (!allUsers) {
      logError("Users not found");
      throw new Error("Users not found");
    }

    return allUsers;
  } catch (error) {
    logError(`Error in getAllUser. Error is ${error}`);
    throw new Error("Error while fetching users");
  }
}

async function addNewUser(userData) {
  try {
    logInfo(`We are at addNewUser in service. New user is ${userData}`);
    const user = await User.create(userData);
    return user;
  } catch (error) {
    logError(`Error in addNewUser. Error is ${error}`);
    throw new Error("Error while adding a new user");
  }
}

async function getUserById(userId) {
  try {
    logInfo(`We are at getUserById in service. User id is : ${userId}`);
    const userById = await User.findByPk(userId);
    return userById || null;
  } catch (error) {
    logError(`Error in getUserById. Error is ${error}`);
    throw new Error("Error while fetching user");
  }
}

async function updateUserById(userId, updatedUserData) {
  try {
    logInfo(`We are at updateUserById in service. User id is: ${userId}`);

    const user = await User.findByPk(userId);

    if (!user) {
      logError("User not found");
      throw new Error("User not found");
    }

    await user.update(updatedUserData);

    const updatedUser = await User.findByPk(userId);

    return updatedUser;
  } catch (error) {
    logError(`Error in updateUserById. Error is ${error}`);
    throw new Error("Error updating user by ID", error);
  }
}

async function disableUser(userId) {
  try {
    logInfo(
      `We are at disableUser  in service. User to be disabled is: ${userId}`,
    );
    const user = await User.findByPk(userId);

    if (!user) {
      logError("User not found");
      throw new Error("User not found");
    }

    user.isUserActive = false;

    await user.save();

    return user;
  } catch (error) {
    logError(`Error in disableUser. Error is ${error}`);
    throw new Error("Error while disable user ", error);
  }
}

module.exports = {
  getAllUser,
  getUserById,
  addNewUser,
  updateUserById,
  disableUser,
};
