export const errorHandler = (err, req, res, next) => {
    // If headers were already sent, delegate to default Express error handler
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';

    // Mongoose bad ObjectId / CastError
    if (err.name === 'CastError') {
        statusCode = 404;
        message = `Resource not found with id: ${err.value}`;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(', ');
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = 409;
        message = 'Duplicate field value entered';
    }

    // JWT invalid token
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    // JWT expired token
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    console.error('Error:', err);

    return res.status(statusCode).json({
        success: false,
        error: message,
    });
};