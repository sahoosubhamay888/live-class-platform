import { generateToken04 } from '../utils/zegoToken.js';
import sessionsModel from "../model/session.model.js";

export const getZegoToken = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const appId = process.env.ZEGO_APP_ID;
        const secret = process.env.ZEGO_SERVER_SECRET;

        if (!appId || !secret) {
            return res.status(500).json({
                success: false,
                error: 'Zego credentials are not configured on the server',
            });
        }

        const token = generateToken04(appId, userId, secret, 86400);

        res.json({
            success: true,
            data: { token },
        });
    } catch (error) {
        next(error);
    }
};

export const listSession = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { status } = req.query;

        const query = {
            $or: [{ host: userId }, { "participants.userId": userId }],
        };

        if (status && status !== "all") {
            query.status = status;
        }

        const session = await sessionsModel.find(query).sort({ createdAt: -1 });

        const result = session.map((s) => {
            const activeParticipants = s.participants.filter((p) => p.isActive !== false);
            return {
                id: s._id,
                roomId: s.roomId,
                hostName: s.hostName,
                status: s.status,
                participantCount: activeParticipants.length,
                startedAt: s.startedAt,
                endedAt: s.endedAt,
                isHost: s.host.toString() === userId.toString(),
            };
        });

        return res.json({
            success: true,
            data: {
                session: result,
            },
        });
    }

    catch (error) {
        next(error);
    }
}

export const createSession = async (req, res, next) => {
    try {
        const user = req.user;

        //generate unique room id
        let roomId;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            roomId = sessionsModel.generateRoomId();
            const exists = await sessionsModel.roomIdExists(roomId);
            if (!exists) break;
            attempts++;
        } while (attempts < maxAttempts);

        if (attempts >= maxAttempts) {
            return res.status(500).json({
                success: false,
                error: "Failed to generate unique room ID. Please try again",
            });
        }

        const session = await sessionsModel.create({
            roomId,
            host: user._id,
            hostName: user.name,
            participants: [{
                userId: user._id,
                userName: user.name,
                isActive: true
            }]
        })

        const activeParticipants = session.participants.filter((p) => p.isActive !== false);

        res.status(201).json({
            success: true,
            data: {
                session: {
                    id: session._id,
                    roomId: session.roomId,
                    hostName: session.hostName,
                    status: session.status,
                    participantCount: activeParticipants.length,
                    startedAt: session.startedAt,
                    isHost: true,
                    participants: activeParticipants,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
}

export const joinSession = async (req, res, next) => {
    try {
        const { roomId } = req.body;
        const user = req.user;

        if (!roomId) {
            return res.status(400).json({
                success: false,
                error: "Room Id is required",
            });
        }

        const session = await sessionsModel.findOne({ roomId });
        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found. Please check the roomId",
            });
        }

        if (session.status !== "active") {
            return res.status(400).json({
                success: false,
                error: "This session has ended",
            });
        }

        // If user was previously removed, reset their kicked status so they can rejoin
        if (session.kickedUsers && session.kickedUsers.length > 0) {
            session.kickedUsers = session.kickedUsers.filter(
                (id) => id.toString() !== user._id.toString()
            );
        }

        // Check if user already exists in participants
        const existingParticipantIndex = session.participants.findIndex(
            (p) => p.userId.toString() === user._id.toString(),
        );

        if (existingParticipantIndex !== -1) {
            session.participants[existingParticipantIndex].isActive = true;
            session.participants[existingParticipantIndex].userName = user.name;
        } else {
            session.participants.push({
                userId: user._id,
                userName: user.name,
                isActive: true,
            });
        }

        await session.save();

        const activeParticipants = session.participants.filter(
            (p) => p.isActive !== false,
        );

        return res.json({
            success: true,
            data: {
                session: {
                    id: session._id,
                    roomId: session.roomId,
                    hostName: session.hostName,
                    status: session.status,
                    participantCount: activeParticipants.length,
                    isHost: session.host.toString() === user._id.toString(),
                    participants: activeParticipants,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
}

export const getSession = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const userId = req.user._id;

        const session = await sessionsModel.findOne({ roomId });
        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found. Please check the roomId",
            });
        }

        // Check if user was kicked by the host
        const isKicked = Boolean(
            session.kickedUsers &&
            session.kickedUsers.some((id) => id.toString() === userId.toString())
        );

        // Check if user is or was an active participant
        const isParticipant = session.participants.some(
            (p) => p.userId.toString() === userId.toString() && p.isActive !== false,
        );

        const activeParticipants = session.participants.filter(
            (p) => p.isActive !== false,
        );

        return res.json({
            success: true,
            data: {
                session: {
                    id: session._id,
                    roomId: session.roomId,
                    hostName: session.hostName,
                    status: session.status,
                    participantCount: activeParticipants.length,
                    isHost: session.host.toString() === userId.toString(),
                    isParticipant,
                    isKicked,
                    participants: activeParticipants,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
}

export const endSession = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user._id;

        const session = await sessionsModel.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        //verify user is the host
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                error: "Only the host can end the session",
            });
        }

        //check if already ended
        if (session.status === "ended") {
            return res.status(400).json({
                success: false,
                error: "Session has already ended",
            });
        }

        session.status = "ended";
        session.endedAt = new Date();
        await session.save();

        return res.json({
            success: true,
            data: {
                session: {
                    id: session._id,
                    roomId: session.roomId,
                    status: session.status,
                    endedAt: session.endedAt
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
}

export const leaveSession = async (req, res, next) => {
    try {
        const { roomId } = req.body;
        const userId = req.user._id;

        if (!roomId) {
            return res.status(400).json({
                success: false,
                error: "Room Id is required",
            });
        }

        const session = await sessionsModel.findOne({ roomId });
        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        // Mark participant as inactive
        const participant = session.participants.find(
            (p) => p.userId.toString() === userId.toString(),
        );

        if (participant) {
            participant.isActive = false;
            await session.save();
        }

        return res.json({
            success: true,
            data: {
                message: "Left session successfully",
            },
        });
    }
    catch (error) {
        next(error);
    }
}

export const kickParticipant = async (req, res, next) => {
    try {
        const { roomId, targetUserId } = req.body;
        const hostUserId = req.user._id;

        if (!roomId || !targetUserId) {
            return res.status(400).json({
                success: false,
                error: "RoomId and targetUserId are required",
            });
        }

        const session = await sessionsModel.findOne({ roomId });
        if (!session) {
            return res.status(404).json({
                success: false,
                error: "Session not found",
            });
        }

        // Verify the requester is the host
        if (session.host.toString() !== hostUserId.toString()) {
            return res.status(403).json({
                success: false,
                error: "Only the host can remove participants",
            });
        }

        // Host cannot remove themselves
        if (targetUserId.toString() === hostUserId.toString()) {
            return res.status(400).json({
                success: false,
                error: "Host cannot remove themselves from the session",
            });
        }

        // Add to kickedUsers array if not already present
        if (!session.kickedUsers) {
            session.kickedUsers = [];
        }
        if (!session.kickedUsers.some((id) => id.toString() === targetUserId.toString())) {
            session.kickedUsers.push(targetUserId);
        }

        // Mark target participant as inactive in session
        const participant = session.participants.find(
            (p) => p.userId.toString() === targetUserId.toString(),
        );
        if (participant) {
            participant.isActive = false;
        }

        await session.save();

        const activeParticipants = session.participants.filter(
            (p) => p.isActive !== false,
        );

        return res.json({
            success: true,
            message: "Participant removed successfully",
            data: {
                session: {
                    id: session._id,
                    roomId: session.roomId,
                    participantCount: activeParticipants.length,
                    participants: activeParticipants,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};