
exports.up = function(knex, Promise) {
    return knex.schema.createTable('comments', (comments) => {
        comments.increments('comment_id').primary()
        comments.string('author').references('users.username')
        comments.integer('article_id').references('articles.article_id')
        comments.text('body')
        comments.integer('votes').defaultTo(0)
        comments.timestamp('created_at').defaultTo(knex.fn.now('created_at'))
        });
  
};
// - `comment_id` which is the primary key                            k
//   - `author` field that references a user's primary key (username) k      l
//   - `article_id` field that references an article's primary key           l
//   - `votes` defaults to 0                                          k
//   - `created_at` defaults to the current timestamp                 k
//   - `body`                                                         k

exports.down = function(knex, Promise) {
return knex.schema.dropTable('comments')
  
};
