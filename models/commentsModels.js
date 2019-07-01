const connection = require("../db/connection");

exports.postCommentModel = ({ body }, { article_id }) => {
  body.author = body.username;
  body.article_id = article_id;
  delete body.username;
  return connection("comments")
    .insert(body)
    .returning("*");
};

exports.getCommentsByArticleIDModel = (query, { article_id }) => {
  let sortOption = query.sort_by || "created_at";
  let ascOrDes = query.order || "desc";
  return connection("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("article_id", "=", article_id)
    .orderBy(sortOption, ascOrDes);
};

exports.updateCommentVotesModel = ({ body }, { comment_id }) => {
  let propToUpdate = body.inc_votes || 0;
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", propToUpdate)
    .returning("*");
};

exports.deleteCommentModel = ({ comment_id }) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .returning("*");
};
