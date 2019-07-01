const {
  postCommentModel,
  getCommentsByArticleIDModel,
  updateCommentVotesModel,
  deleteCommentModel
} = require("../models/commentsModels");

const { checkIfArticleExists } = require("../models/articlesModels");

exports.postCommentController = (req, res, next) => {
  postCommentModel(req, req.params)
    .then(data => {
      res.status(201).send({ comment: data[0] });
    })
    .catch(next);
};

exports.getCommentsByArticleID = (req, res, next) => {
  checkIfArticleExists(req.params).then(data => {
    if (data.length === 0) {
      next({ message: "article not found", status: 404 });
    }
  });

  getCommentsByArticleIDModel(req.query, req.params).then(data => {
    res.send({ comments: data });
  });
};

exports.updateCommentVotesController = (req, res, next) => {
  updateCommentVotesModel(req, req.params)
    .then(data => {
      if (data.length === 0) {
        return Promise.reject({ message: "comment not found", status: 404 });
      }
      res.status(200).send({ comment: data[0] });
    })
    .catch(next);
};

exports.deleteCommentController = (req, res, next) => {
  deleteCommentModel(req.params)
    .then(data => {
      if (data.length === 0) {
        return Promise.reject({ message: "comment not found", status: 404 });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(next);
};
