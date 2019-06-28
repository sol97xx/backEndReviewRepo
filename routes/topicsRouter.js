const topicsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { getAllTopics } = require("../controllers/topics-controllers");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(methodNotAllowed);

module.exports = {topicsRouter};
