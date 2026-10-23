import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZEGO_CONFIG } from '../utils/constants';
import api from './api';

let zegoInstance = null;
let userHasJoined = false;
let isDestroying = false;
let activeRoomId = null;
let joinPromise = null;

// Helper to detect mobile devices where Zego mobile engine behaves differently
const isMobileDevice = () => {
    if (typeof window === 'undefined') return false;
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth <= 768 ||
        (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024)
    );
};

// Generate a kit token securely from the backend
export const generateKitToken = async (roomId, userId, userName) => {
    const appId = Number(ZEGO_CONFIG.APP_ID);
    if (!appId || isNaN(appId)) {
        throw new Error('Invalid or missing ZEGOCLOUD App ID');
    }

    if (!roomId || !userId) {
        throw new Error('roomId and userId are required to generate token.');
    }

    try {
        // Fetch secure token from backend
        const res = await api.get('/session/token');
        const serverToken = res.data?.data?.token;

        if (!serverToken) {
            throw new Error('Server returned an empty token.');
        }

        // Zego's official production kit token generator
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
            appId,
            serverToken,
            String(roomId),
            String(userId),
            userName || `User_${userId}`
        );

        if (!kitToken) {
            throw new Error('Token generation returned an empty token.');
        }

        return kitToken;
    } catch (error) {
        console.error('ZEGO token generation error:', error);
        throw new Error(`Failed to generate ZEGO token: ${error.response?.data?.error || error.message}`);
    }
};

// Join a Zego video room with race-condition guard
export const joinRoom = async (roomId, userId, userName, container, onJoinCallback, onLeaveCallback) => {
    if (!container) {
        throw new Error('Container element is required to mount ZEGO UI.');
    }

    if (!roomId || !userId) {
        throw new Error('roomId and userId are required to join room.');
    }

    // If already joined the same room, return existing instance
    if (zegoInstance && activeRoomId === roomId) {
        return zegoInstance;
    }

    // If a join is already in flight for this room, await it
    if (joinPromise && activeRoomId === roomId) {
        return joinPromise;
    }

    // Clean up any previous instance first
    if (zegoInstance || isDestroying) {
        await leaveRoom();
    }

    activeRoomId = roomId;

    joinPromise = (async () => {
        try {
            const kitToken = await generateKitToken(roomId, userId, userName);

            // Check if cancelled/aborted while fetching token
            if (activeRoomId !== roomId) {
                return null;
            }

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            if (!zp) {
                throw new Error('Failed to create ZEGO UIKit instance.');
            }

            zp.joinRoom({
                container,
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                sharedLinks: [
                    {
                        name: 'Copy Join Link',
                        url: `${window.location.origin}/join?roomId=${roomId}`,
                    },
                ],
                showRoomDetailsButton: true,
                showScreenSharingButton: true,
                showPinButton: true,
                showLayoutButton: true,
                showAudioVideoSettingsButton: true,
                showMyCameraToggleButton: true,
                showMyMicrophoneToggleButton: true,
                useFrontFacingCamera: true,
                showTextChat: true,
                showUserList: true,
                showLeavingView: false,
                console: 'Error',
                onJoinRoom: () => {
                    userHasJoined = true;
                    if (typeof onJoinCallback === 'function') {
                        onJoinCallback();
                    }
                },
                onLeaveRoom: () => {
                    userHasJoined = false;
                    const wasDestroying = isDestroying;

                    if (typeof onLeaveCallback === 'function') {
                        try {
                            onLeaveCallback();
                        } catch (e) {
                            console.error('Error in onLeaveCallback:', e);
                        }
                    }

                    // On Mobile, Zego does not reset back to the Pre-Join Preview screen automatically.
                    // If the user tapped the in-call leave button while remaining on the session page,
                    // clean up the old mobile instance and re-initialize so the Pre-Join Preview screen displays.
                    if (!wasDestroying && isMobileDevice() && container && document.body.contains(container)) {
                        try {
                            if (zp && typeof zp.destroy === 'function') {
                                zp.destroy();
                            }
                        } catch (e) {
                            console.warn('Error destroying mobile Zego instance on leave:', e);
                        }
                        container.innerHTML = '';
                        zegoInstance = null;
                        activeRoomId = null;

                        setTimeout(() => {
                            if (container && document.body.contains(container)) {
                                joinRoom(roomId, userId, userName, container, onJoinCallback, onLeaveCallback);
                            }
                        }, 100);
                    } else {
                        zegoInstance = null;
                        activeRoomId = null;
                    }
                },
                onError: (error) => {
                    console.error('ZEGO Room Error:', error);
                },
            });

            zegoInstance = zp;
            return zp;
        } catch (error) {
            console.error('Error joining ZEGO room:', error);
            activeRoomId = null;
            userHasJoined = false;
            zegoInstance = null;
            throw new Error(`Failed to join room: ${error.message}`);
        } finally {
            joinPromise = null;
        }
    })();

    return joinPromise;
};

// Leave the room and clean up the active Zego instance
export const leaveRoom = async (onLeaveCallback) => {
    activeRoomId = null;

    if (joinPromise) {
        try {
            await joinPromise;
        } catch {
            // Ignore join errors during leave
        }
    }

    if (!zegoInstance || isDestroying) {
        userHasJoined = false;
        zegoInstance = null;
        if (typeof onLeaveCallback === 'function') {
            onLeaveCallback();
        }
        return;
    }

    isDestroying = true;
    const instance = zegoInstance;
    zegoInstance = null;
    userHasJoined = false;

    try {
        if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
        }
    } catch (error) {
        console.error('Error leaving ZEGO room:', error);
    } finally {
        isDestroying = false;
        if (typeof onLeaveCallback === 'function') {
            try {
                onLeaveCallback();
            } catch (cbError) {
                console.error('Error in onLeaveCallback:', cbError);
            }
        }
    }
};

export const getZegoInstance = () => zegoInstance;

export const hasUserJoined = () => userHasJoined;