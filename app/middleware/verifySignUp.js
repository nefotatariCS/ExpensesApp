const db = require("../models");
const SYSTEMROLES = db.SYSTEMROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check Username
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! UserName is actually used!",
      });
      return;
    }

    // Check Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is actually used!",
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!SYSTEMROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
