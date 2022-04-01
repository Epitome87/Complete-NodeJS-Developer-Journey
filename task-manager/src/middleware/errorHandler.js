const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: error.message,
    // We only want the stack trace if we aren't in Production
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  });
};

module.exports = errorHandler;
