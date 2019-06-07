const {fetchUserByUserName} = require('../models/usersModels')

exports.getUserByUserName = (req,res, next)=>{

fetchUserByUserName(req.params).then((data)=>{if(data.user.length===0)
    {return Promise.reject({"message":"username not found","status":404})}
   
    else {return data}})
.then((data)=>{res.status(200).send(data)}).catch(next)
}

// .then((data)=>{if(data.user.length===0)
//     {return Promise.reject({"message":"username not found","status":404})}})