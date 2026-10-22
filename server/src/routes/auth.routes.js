import express from "express"
import { body, validationResult } from 'express-validator'
import { userRegisterController, userLoginController, userLogoutController, getMe } from "../controllers/auth.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

//validation middleware
const handleValidationError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0].msg
        })
    }

    next();
}

//POST /api/auth/register
authRouter.post(
    '/register',
    [
        body('name')
            .trim()
            .isLength({ min: 2, max: 50 })
            .withMessage('Name must be between 2 and 50 characters'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
    ],
    handleValidationError,
    userRegisterController
)

//POST /api/auth/login
authRouter.post(
    '/login',
    [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please provide a valid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters')
    ],
    handleValidationError,
    userLoginController
)

//GET /api/auth/me
authRouter.get("/me", authMiddleWare, getMe);

//POST /api/auth/logout
authRouter.post("/logout", authMiddleWare, userLogoutController);

export default authRouter