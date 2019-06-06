const {fetchUserByUserName} = require('../models/usersModels')

exports.getUserByUserName = (req,res, next)=>{
fetchUserByUserName(req.params).then((user)=>{res.status(200).send(user)})
}