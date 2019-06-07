const {fetchArticleByArticleID, updateVotesModel,fetchAllArticles} = require('../models/articlesModels')

exports.getArticleByArticleID = (req,res,next)=>{
fetchArticleByArticleID(req.params).then((data)=>{if(data.Article.length===0)
    {return Promise.reject({"message":"article not found","status":404})}
    
else{return data}})
.then((article)=>{res.status(200).send(article)}).catch(next)
}

exports.updateVotesController= (req,res,next)=>{
updateVotesModel(req,req.params).then((data)=>{res.status(200).send(data)})
}

exports.getAllArticles = (req,res,next) => {
fetchAllArticles(req.query,req.params ).then((data)=>{res.send(data)})
}

// .then((data)=>{if(data.Article.length===0)
//     {return Promise.reject({"message":"article not found","status":404})}
// else{return data}})