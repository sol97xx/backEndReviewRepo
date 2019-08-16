const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { articlesRouter } = require("./articlesRouter");
const { commentsRouter } = require("./commentsRouter");
const { topicsRouter } = require("./topicsRouter");
const { usersRouter } = require("./usersRouter");
const routes = require ('./routesList')

apiRouter
  .route("/")
  .get((req, res) => res.send(routes))
  .all(methodNotAllowed);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;



