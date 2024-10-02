const jwt = require("jsonwebtoken");
const config = require("../config/encrypt.config");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let activeToken = req.headers["x-access-token"];
  if (!activeToken) {
    return res.status(403).send({
      message: "Token is not provided in request!",
    });
  }

  jwt.verify(activeToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;
