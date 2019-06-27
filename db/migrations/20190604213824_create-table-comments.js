
exports.up = function (knex, Promise) {
    console.log('creating table comments')
    return knex.schema.createTable('comments', (comments) => {
        comments.increments('comment_id').primary()
        comments.string('author').references('users.username').notNullable()
        comments.integer('article_id').references('articles.article_id')
        comments.text('body').notNullable()
        comments.integer('votes').defaultTo(0)
        comments.timestamp('created_at').defaultTo(knex.fn.now())
    });

};


exports.down = function (knex, Promise) {
    console.log('destroying table comments')
    return knex.schema.dropTable('comments')

};
