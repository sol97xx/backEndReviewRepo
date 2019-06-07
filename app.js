const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);



app.use((err,req,res,next)=>{
if(err.status){res.status(err.status).send(err.message)}
})
app.use(handle500);

module.exports = app;
