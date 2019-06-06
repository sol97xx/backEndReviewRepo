const {articles,comments,topics,users} = require('../data/index');
const {formatData, giveDate} = require('/home/sol/BENDPROJECT/utils/format-data.js')


exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
     
    return knex('topics').insert(topics, '*')
    })
    .then(() =>{
      
    return knex('users').insert(users, '*')
    })
    .then(()=>{
   
    const data = giveDate(articles)
    return knex('articles').insert(data).returning('*')
    })
    .then((articles)=>{
    const data = formatData(comments,articles)
    return knex('comments').insert(data, '*')
    })
    
};  
