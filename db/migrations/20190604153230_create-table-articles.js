exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articles => {
    articles.increments("article_id").primary();
    articles.string("title");
    articles.text("body");
    articles.integer("votes").defaultTo(0);
    articles.string("topic").references("topics.slug");
    articles.string("author").references("users.username");
    articles.timestamp("created_at").defaultTo(knex.fn.now());
   
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
