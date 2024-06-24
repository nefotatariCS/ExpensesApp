const db = require("../models");
const config = require("../config/encrypt.config");
const User = db.user;

const userRoleService = require("../services/user/userRole.service");
const userService = require("../services/user/user.service");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var CryptoJS = require("crypto-js");
const secretKey = "ExpenseslApp";

exports.signup = (req, res) => {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
      name: req.body.name,
      lastName: req.body.lastName,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      userRoleId: req.body.userRoleId,
      isUserActive: req.body.isUserActive,
    };

    const user = userService.addNewUser(newUser);

    res.status(200).json({ message: "New user was added successfully", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      userName: req.body.userName,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const decryptedData = CryptoJS.AES.decrypt(
        req.body.encryptedPass,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      var passwordIsValid = bcrypt.compareSync(decryptedData, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 2400,
      });

      const userRoleId = user.dataValues.userRoleId;
      const userRole = await userRoleService.getUserRoleById(userRoleId);
      res.status(200).send({
        id: user.id,
        userName: user.userName,
        email: user.email,
        role: userRole.name,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
