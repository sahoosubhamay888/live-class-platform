import userModel from "../model/user.model.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleWare = async (req, res, next) => {
    try {
        // Extract token from cookie or Authorization Bearer header
        let token = req.cookies?.token;
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized access, token is missing"
            });
        }

        // Verify JWT
        const decoded = verifyToken(token);
        // Fetch user from DB
        const user = await userModel.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "User not found or account deactivated"
            });
        }
        req.user = user;
        return next();
    }
    catch (err) {
        next(err);
    }
};
