const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { getAllTopics } = require('../controllers/topics-controllers')
const { getUserByUserName } = require('../controllers/users-controllers')
const { getArticleByArticleID, updateVotesController, getAllArticles } = require('../controllers/articles-controllers')
const { postCommentController, getCommentsByArticleID, updateCommentVotesController, deleteCommentController } = require('../controllers/comments-controllers')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.route('/topics').get(getAllTopics)
  .all(methodNotAllowed)

apiRouter.route('/users/:username').get(getUserByUserName)
  .all(methodNotAllowed)

apiRouter.route('/articles/:article_id').get(getArticleByArticleID)
  .patch(updateVotesController)
  .all(methodNotAllowed)

apiRouter.route('/articles/:article_id/comments').post(postCommentController)
  .get(getCommentsByArticleID)
  .all(methodNotAllowed)

apiRouter.route('/articles').get(getAllArticles)
  .all(methodNotAllowed)

apiRouter.route('/comments/:comment_id').patch(updateCommentVotesController)
  .delete(deleteCommentController)
  .all(methodNotAllowed)







module.exports = apiRouter;
