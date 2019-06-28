const usersRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getUserByUserName } = require("../controllers/users-controllers");

usersRouter
  .route("/:username")
  .get(getUserByUserName)
  .all(methodNotAllowed);

module.exports = {usersRouter};
