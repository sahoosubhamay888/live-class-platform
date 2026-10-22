import jwt from 'jsonwebtoken'

const isProduction = process.env.NODE_ENV === "production";

// Cookie configuration used when storing the JWT
export const cookieOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
};

export const generateToken = (userId) => {
    // JWT cannot be created without the secret key
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured in environment variables");
    }

    // Create JWT
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
    )
}

export const verifyToken = (token) => {
    // JWT cannot be created without the secret key
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured in environment variables");
    }

    // Verify the token and return its decoded payload
    return jwt.verify(token, process.env.JWT_SECRET);
}
