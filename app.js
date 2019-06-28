const express = require("express");
const apiRouter = require("./routes/api");
const { routeNotFound, handle500, customErrorHandler, badReqPsqlErrorHandler, notFoundPsqlErrorHandler } = require("./errors");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(customErrorHandler);

app.use(badReqPsqlErrorHandler);

app.use(notFoundPsqlErrorHandler);

app.use(handle500);

module.exports = app;
