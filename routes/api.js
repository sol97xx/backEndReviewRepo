const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {getAllTopics} = require('../controllers/topics-controllers')
const {getUserByUserName} = require('../controllers/users-controllers')
const {getArticleByArticleID, updateVotesController, getAllArticles} = require('../controllers/articles-controllers')
const {postCommentController,getCommentsByArticleID,updateCommentVotesController,deleteCommentController} = require('../controllers/comments-controllers')
apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.route('/topics').get(getAllTopics)
apiRouter.route('/users/:username').get(getUserByUserName)

apiRouter.route('/articles/:article_id').get(getArticleByArticleID).patch(updateVotesController)


apiRouter.route('/articles/:article_id/comments').post(postCommentController).get(getCommentsByArticleID)
apiRouter.get('/articles',getAllArticles)

apiRouter.route('/comments/:comment_id').patch(updateCommentVotesController).delete(deleteCommentController)







module.exports = apiRouter;
