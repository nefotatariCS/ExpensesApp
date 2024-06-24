const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const userController = require("../../controllers/users/user.controller");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/getAll", [authJwt.verifyToken], userController.getAllUsers);

router.get(
  "/getUserById/:userId",
  [authJwt.verifyToken],
  userController.getUserById
);

router.post(
  "/updateUserById/:userId",
  [authJwt.verifyToken],
  userController.updateUserById
);

router.put(
  "/disableUser/:userId",
  [authJwt.verifyToken],
  userController.disableUser
);

module.exports = router;
