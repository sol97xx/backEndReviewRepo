const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500 } = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);



app.use((err, req, res, next) => {
    if (err.status) { res.status(err.status).send(err.message) }
    else { next(err) }
})

app.use((err, req, res, next) => {
    let psqlCodes = ['22P02','23502','42703']
    if (psqlCodes.includes(err.code)) { res.status(400).send({ "message": "bad request" }) }
    else (next(err))
})

app.use((err, req, res, next) => {
    let psqlCodes = ['23503']
    if (psqlCodes.includes(err.code)) { res.status(404).send({ "message": "specified resource not found" }) }
    else (next(err))
})

app.use(handle500);

module.exports = app;
