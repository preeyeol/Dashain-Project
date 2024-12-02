const { stack } = require("../route/userRoute");

const devError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const prodError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      message: err.message,
      status: err.status,
      statusCode: err.statusCode,
    });
  }

  res.status(500).json({
    status: "fail",
    message: "Internal Server Error",
  });
};

const errorHandler = (err, req, res, next) => {
  console.log("From global error handling middleware");
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  console.log(err);

  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  }
  if (process.env.NODE_ENV === "production") {
    prodError(err, res);
  }
};

module.exports = errorHandler;
