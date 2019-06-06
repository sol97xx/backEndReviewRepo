const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {getAllTopics} = require('../controllers/topics-controllers')
const {getUserByUserName} = require('../controllers/users-controllers')
const {getArticleByArticleID, updateVotesController} = require('../controllers/articles-controllers')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.route('/topics').get(getAllTopics)
apiRouter.route('/users/:username').get(getUserByUserName)

apiRouter.route('/articles/:article_id')
.get(getArticleByArticleID)
apiRouter.patch('/articles/:article_id',updateVotesController)








module.exports = apiRouter;
