exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
};

exports.badReqPsqlErrorHandler = (err, req, res, next) => {
  let psqlCodes = ["22P02", "23502", "42703"];
  if (psqlCodes.includes(err.code)) {
    res.status(400).send({ message: "bad request" });
  } else next(err);
};

exports.notFoundPsqlErrorHandler = (err, req, res, next) => {
  let psqlCodes = ["23503"];
  if (psqlCodes.includes(err.code)) {
    res.status(404).send({ message: "specified resource not found" });
  } else next(err);
};
