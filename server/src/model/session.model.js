import mongoose from "mongoose"

//creating session schema
const sessionSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true, trim: true, index: true },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    hostName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'ended'],
        default: 'active'
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        userName: {
            type: String,
            required: true
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }],
    kickedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isLocked: {
        type: Boolean,
        default: false
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    endedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

//generate a unique room ID
sessionSchema.statics.generateRoomId = function () {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let roomId = '';
    for (let i = 0; i < 12; i++) {
        roomId += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return roomId;
}

//check if Room-Id already exists
sessionSchema.statics.roomIdExists = async function (roomId) {
    const session = await this.findOne({ roomId });
    return !!session;
}

export default mongoose.model("Session", sessionSchema);
