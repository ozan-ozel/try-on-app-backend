// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging purposes

  // Default error response
  const statusCode = err.status || 500; // Use error's status code or default to 500 (Internal Server Error)
  const message = err.message || "Internal Server Error"; // Use error's message or a generic message

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Show stack trace only in non-production environments
  });
};

export default errorHandler;
