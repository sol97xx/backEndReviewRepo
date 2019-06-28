const articlesRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  getArticleByArticleID,
  updateVotesController,
  getAllArticles
} = require("../controllers/articles-controllers");

const {
  postCommentController,
  getCommentsByArticleID
} = require("../controllers/comments-controllers");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleID)
  .patch(updateVotesController)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentController)
  .get(getCommentsByArticleID)
  .all(methodNotAllowed);

module.exports = {articlesRouter};
