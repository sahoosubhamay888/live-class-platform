import userModel from "../model/user.model.js"
import { generateToken, cookieOptions } from "../utils/jwt.js";

export const userRegisterController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(400).json({
                success: false,
                error: 'User already exists with this email'
            })
        }

        //create a new user
        const user = await userModel.create({ email, password, name });

        //generate jwt token
        const token = generateToken(user._id);
        // Store JWT in an HTTP-only cookie
        res.cookie("token", token, cookieOptions);

        return res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
            },
            message: 'User registered successfully'
        })

    } catch (error) {
        next(error)
    }
}

export const userLoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            })
        }

        //check if password matched
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            })
        }

        //generate jwt token
        const token = generateToken(user._id);
        // Store JWT in an HTTP-only cookie
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
            },
            message: 'User logged in successfully'
        })

    } catch (error) {
        next(error)
    }
}

export const getMe = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            data: {
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email
                },
            },
            message: 'User profile retrieved successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const userLogoutController = async (req, res, next) => {
    try {
        res.clearCookie("token", cookieOptions)
        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};
