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
}