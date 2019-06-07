
exports.up = function(knex, Promise) {
    console.log('creating table articles')
    return knex.schema.createTable('articles', (articles) => {
        articles.increments('article_id').primary()
        articles.string('title')
        articles.text('body')
        articles.integer('votes').defaultTo(0)
        articles.string('topic').references('topics.slug')
        articles.string('author').references('users.username')
        articles.timestamp('created_at').defaultTo(knex.fn.now())
        });
  
};

exports.down = function(knex, Promise) {
    console.log('destroying table articles')
    return knex.schema.dropTable('articles')
};
// - `article_id` which is the primary key
// - `title`
// - `body`
// - `votes` defaults to 0
// - `topic` field which references the slug in the topics table
// - `author` field that references a user's primary key (username)
// - `created_at` defaults to the current timestamp