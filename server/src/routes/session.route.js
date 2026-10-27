import express from "express"
import { body, validationResult } from 'express-validator'
import { getZegoToken, getSession, createSession, leaveSession, endSession, joinSession, listSession, kickParticipant, blockParticipant, toggleLockSession } from "../controllers/session.controller.js";
import { authMiddleWare } from "../middleware/auth.middleware.js";

const sessionRouter = express.Router();

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

const validateRoomIdBody = [
    body('roomId')
        .trim()
        .notEmpty()
        .withMessage('RoomId is required'),
    handleValidationError,
];

sessionRouter.use(authMiddleWare);

// GET /api/session/token
sessionRouter.get('/token', getZegoToken);

//GET /api/session/list
sessionRouter.get("/list", listSession);

//POST /api/session/create
sessionRouter.post('/create', createSession);

//POST /api/session/join
sessionRouter.post('/join', validateRoomIdBody, joinSession);

//GET /api/session/:roomId
sessionRouter.get('/:roomId', getSession);

//POST /api/session/end/:sessionId
sessionRouter.post('/end/:sessionId', endSession);

//POST /api/session/leave
sessionRouter.post('/leave', validateRoomIdBody, leaveSession);

//POST /api/session/kick
sessionRouter.post('/kick', kickParticipant);

//POST /api/session/block
sessionRouter.post('/block', blockParticipant);

//POST /api/session/toggle-lock
sessionRouter.post('/toggle-lock', toggleLockSession);

export default sessionRouter
