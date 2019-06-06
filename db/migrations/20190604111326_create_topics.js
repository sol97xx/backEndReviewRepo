
exports.up = function(knex, Promise) {
    console.log('creating table topics')
    return knex.schema.createTable('topics', (topics) => {
        topics.string('slug').primary();
        topics.string('description')
        });
  
};

exports.down = function(knex, Promise) {
    console.log('destroying table topics')
return knex.schema.dropTable('topics')
  
};
