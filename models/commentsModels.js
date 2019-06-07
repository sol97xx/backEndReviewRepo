const connection = require('../db/connection')

exports.postCommentModel = ({body},{article_id}) => {
let comment = {...body}
comment.author = body.username
comment.article_id = article_id
comment.created_at = new Date(Date.now())
delete comment.username
return connection('comments').insert(comment).returning('*').then((data)=>{return {'comment':data}})
}

exports.getCommentsByArticleIDModel = (query,{article_id})=>{
    let sortOption = query.sort_by || 'created_at'
    let ascORdes = query.order || 'desc'
    return connection('comments')
      .select('comment_id','votes','created_at','author','body','article_id')
      .where('article_id','=',article_id)
      .orderBy(`${sortOption}`, `${ascORdes}`).then((data)=>{return {'comments':data}})
}

exports.updateCommentVotesModel = ({body},{comment_id})=>{
  return connection('comments').select('votes').where('comment_id','=',comment_id).returning('*')
 .then(([comment])=>{
 let propToUpdate = +comment.votes + body.inc_votes
 return connection('comments').update('votes',propToUpdate).where('comment_id','=',comment_id)
 .returning('*')})
 .then((data)=>{return {'comment':data}})}

exports.deleteCommentModel = ({comment_id})=>{
return connection('comments').where('comment_id','=',comment_id).del().returning('*')
}
