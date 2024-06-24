const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middleware");
const userRoleController = require("../../controllers/users/userRole.controller");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get(
  "/getAll",
  [authJwt.verifyToken],
  userRoleController.getAllUserRoles
);

router.get(
  "getAllActive",
  [authJwt.verifyToken],
  userRoleController.getAllActiveUserRoles
);

router.get(
  "getById/:userRoleId",
  [authJwt.verifyToken],
  userRoleController.getUserRolesById
);

module.exports = router;
