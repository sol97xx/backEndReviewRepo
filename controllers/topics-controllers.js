const { fetchAllTopics } = require("../models/topicsModels");

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then(data => {
      res.status(200).send({ topics: data });
    })
    .catch(next);
};
