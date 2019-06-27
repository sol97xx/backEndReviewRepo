const {articles,comments,topics,users} = require('../data/index');
const {formatArticles,formatComments} = require('/home/sol/BENDPROJECT/utils/format-data.js')


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
   
    const articlesData = formatArticles(articles)
    return knex('articles').insert(articlesData).returning('*')
    })
    .then((articles)=>{
    const commentsData = formatComments(comments,articles)
    return knex('comments').insert(commentsData, '*')
    })
};  
