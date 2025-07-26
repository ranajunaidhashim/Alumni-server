export default function errorHandler(err, req, res, next) {
  console.error(err.stack || err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
}
