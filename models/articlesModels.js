const connection = require('../db/connection')

exports.fetchArticleByArticleID = ({article_id}) => {
    return connection('articles')
    .select('articles.*')
    .where('articles.article_id','=',article_id)
    .count({ comment_count: 'articles.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .returning('*')
    .then((data)=>{return {'Article':data}})}

exports.updateVotesModel = ({body},{article_id})=>{
     return connection('articles').select('votes').where('article_id','=',article_id).returning('*')
    .then(([article])=>{
    let propToUpdate = +article.votes + body.inc_votes
    return connection('articles').update('votes',propToUpdate).where('article_id','=',article_id)
    .returning('*')})
    .then((data)=>{return {'Article':data}})
}

exports.fetchAllArticles = (query,{article_id})=>{
    let sortOption = query.sort_by || 'created_at'
    let ascORdes = query.order || 'desc'
    
    return connection('articles')
      .select('*')
      .orderBy(`${sortOption}`, `${ascORdes}`)
      .modify((statement)=>{if(query.author) statement.where('author','=',query.author)})
      .modify((statement)=>{if(query.topic) statement.where('topic','=',query.topic)})
      .returning('*').then((data)=>{return {'articles':data}})
}
