const connection = require("../db/connection");

exports.fetchUserByUserName = ({ username }) => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username)
    .returning("*");
};
