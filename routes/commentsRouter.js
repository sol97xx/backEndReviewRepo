const commentsRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const {
  updateCommentVotesController,
  deleteCommentController
} = require("../controllers/comments-controllers");

commentsRouter
  .route("/:comment_id")
  .patch(updateCommentVotesController)
  .delete(deleteCommentController)
  .all(methodNotAllowed);

module.exports = {commentsRouter};
