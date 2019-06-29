const {
  fetchArticleByArticleID,
  updateVotesModel,
  fetchAllArticles
} = require("../models/articlesModels");

exports.getArticleByArticleID = (req, res, next) => {
  fetchArticleByArticleID(req.params)
    .then(data => {
      if (data.length === 0) {
        return Promise.reject({ message: "article not found", status: 404 });
      }
      res.status(200).send({ article: data[0] });
    })
    .catch(next);
};

exports.updateVotesController = (req, res, next) => {
  if (!req.body.inc_votes) {
    next({ message: "malformed/missing request body", status: 400 });
    return;
  }
  updateVotesModel(req, req.params)
    .then(data => {
      if (data.length === 0) {
        return Promise.reject({ message: "article not found", status: 404 });
      } else {
        res.status(200).send({ article: data[0] });
      }
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles(req.query)
    .then(data => {
      if (data.length === 0) {
        return Promise.reject({
          message: "specified articles not found",
          status: 404
        });
      } else {
        res.send({ Articles: data });
      }
    })
    .catch(next);
};
