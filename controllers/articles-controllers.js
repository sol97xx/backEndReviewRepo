const {fetchArticleByArticleID, updateVotesModel} = require('../models/articlesModels')

exports.getArticleByArticleID = (req,res, next)=>{
fetchArticleByArticleID(req.params).then((article)=>{res.status(200).send(article)}).catch(console.log)
}

exports.updateVotesController= (req,res,next)=>{
updateVotesModel(req,req.params).then((data)=>{res.status(200).send(data)})
}