const connection = require("../db/connection");

exports.fetchAllTopics = query => {
  return connection.select("*").from("topics");
};
