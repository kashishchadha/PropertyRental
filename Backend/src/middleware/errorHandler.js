const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';

  let message = err.message || 'Internal Server Error';
  let details;

  try {
    const parsed = JSON.parse(message);
    if (parsed && parsed.errors) {
      message = 'Validation failed';
      details = parsed.errors;
    }
  } catch (_e) {
    // Keep original message when not JSON payload.
  }

  res.status(statusCode).json({
    success: false,
    message,
    details,
    ...(isProd ? {} : { stack: err.stack })
  });
};

module.exports = errorHandler;
