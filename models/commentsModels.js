const connection = require("../db/connection");

exports.postCommentModel = ({ body }, { article_id }) => {
  let comment = { ...body };
  comment.author = body.username;
  comment.article_id = article_id;
  comment.created_at = new Date(Date.now());
  delete comment.username;
  return connection("comments")
    .insert(comment)
    .returning("*");
};

exports.getCommentsByArticleIDModel = (query, { article_id }) => {
  let sortOption = query.sort_by || "created_at";
  let ascOrDes = query.order || "desc";
  return connection("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("article_id", "=", article_id)
    .orderBy(`${sortOption}`, `${ascOrDes}`);
};

exports.updateCommentVotesModel = ({ body }, { comment_id }) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .increment("votes", body.inc_votes)
    .returning("*");
};

exports.deleteCommentModel = ({ comment_id }) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .returning("*");
};
