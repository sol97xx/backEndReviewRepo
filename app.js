const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500, customErrorHandler, badReqPsqlErrorHandler, notFoundPsqlErrorHandler } = require("./errors");

const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(customErrorHandler);

app.use(badReqPsqlErrorHandler);

app.use(notFoundPsqlErrorHandler);

app.use(handle500);

module.exports = app;
