
exports.up = function(knex, Promise) {
    console.log('creating table users')
    return knex.schema.createTable('users', (users) => {
        users.string('username').primary().unique()
        users.string('avatar_url')
        users.string('name')
        });
  
};

exports.down = function(knex, Promise) {
    console.log('destroying table users')
    return knex.schema.dropTable('users')
  
};
