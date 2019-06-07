const {postCommentModel,getCommentsByArticleIDModel,updateCommentVotesModel,deleteCommentModel} = require('../models/commentsModels')
exports.postCommentController = (req,res,next)=>{
postCommentModel(req,req.params).then((data)=>{res.status(201).send(data)})
}

exports.getCommentsByArticleID = (req,res,next)=>{
getCommentsByArticleIDModel(req.query,req.params).then((data)=>{res.status(200).send(data)})
}

exports.updateCommentVotesController=(req,res,next)=>{
updateCommentVotesModel(req,req.params).then((data)=>{res.send(data)})
}

exports.deleteCommentController = (req,res,next)=>{
deleteCommentModel(req.params).then((data)=>{res.status(204).send(data)})
}