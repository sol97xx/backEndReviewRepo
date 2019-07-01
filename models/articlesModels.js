const connection = require("../db/connection");

exports.fetchArticleByArticleID = ({ article_id }) => {
  return connection("articles")
    .select("articles.*")
    .where("articles.article_id", "=", article_id)
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id");
};

exports.updateVotesModel = ({ body }, { article_id }) => {
  let propToUpdate = body.inc_votes || 0;
  return connection("articles")
    .where("article_id", "=", article_id)
    .increment("votes", propToUpdate)
    .returning("*");
};

exports.fetchAllArticles = query => {
  let sortOption = query.sort_by || "created_at";
  let ascOrDesc = query.order || "desc";

  return connection("articles")
    .select("articles.*")
    .modify(statement => {
      if (query.topic) statement.where("articles.topic", "=", query.topic);
      if (query.author) statement.where("articles.author", "=", query.author);
    })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.comment_id" })
    .orderBy(sortOption, ascOrDesc);
};

exports.checkIfArticleExists = ({ article_id }) => {
  return connection("articles")
    .select("*")
    .where("article_id", "=", article_id);
};
