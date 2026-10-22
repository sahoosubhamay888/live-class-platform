import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { joinRoom, leaveRoom } from "../service/zego";

export const useZego = () => {
    const [isJoined, setIsJoined] = useState(false);
    const [userHasJoined, setUserHasJoined] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const isJoinedRef = useRef(false);
    const containerRef = useRef(null);
    const joinedRoomIdRef = useRef(null);
    const isJoiningRef = useRef(false);
    const isLeavingRef = useRef(false);
    const { user } = useAuth();
    const userRef = useRef(user);
    userRef.current = user;

    const joinZegoRoom = useCallback(async (roomId) => {
        if (joinedRoomIdRef.current === roomId && isJoinedRef.current) {
            return { success: true };
        }

        if (isJoiningRef.current) {
            return { success: false, error: "Join room in process" };
        }

        if (!roomId) {
            const errorMessage = "Room Id is required";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }

        const currentUser = userRef.current;
        if (!currentUser) {
            const errorMessage = "User must be authenticated to join session";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }

        const userId = currentUser._id || currentUser.id;
        const userName = currentUser.name || `User_${userId}`;

        isJoiningRef.current = true;
        setLoading(true);
        setError(null);

        try {
            // Wait for container to be available with retry mechanism
            let retries = 0;
            const maxRetries = 30;
            while (!containerRef.current && retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                retries++;
            }

            if (!containerRef.current) {
                throw new Error("Video container not ready after waiting. Please refresh the page.");
            }

            const container = containerRef.current;
            if (container.offsetWidth === 0 || container.offsetHeight === 0) {
                console.warn("Container has zero dimensions, waiting a bit more...");
                await new Promise((resolve) => setTimeout(resolve, 500));
            }

            await joinRoom(
                roomId,
                userId,
                userName,
                container,
                () => {
                    // onJoinCall
                    isJoinedRef.current = true;
                    setIsJoined(true);
                    setUserHasJoined(true);
                },
                () => {
                    // onLeaveCall triggered by in-call leave button
                    isJoinedRef.current = false;
                    setIsJoined(false);
                    setUserHasJoined(false);
                    joinedRoomIdRef.current = null;
                },
            );

            isJoinedRef.current = true;
            setIsJoined(true);
            joinedRoomIdRef.current = roomId;
            return { success: true };
        } catch (error) {
            console.error("Failed to join Zego room:", error);
            const errorMessage =
                error.message ||
                "Failed to join room. Please check your camera and microphone permissions and try again.";
            setError(errorMessage);
            isJoinedRef.current = false;
            setIsJoined(false);
            setUserHasJoined(false);
            joinedRoomIdRef.current = null;
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
            isJoiningRef.current = false;
        }
    }, []);

    const leaveZegoRoom = useCallback(async () => {
        const roomId = joinedRoomIdRef.current;
        if (isLeavingRef.current || !roomId) {
            return;
        }

        isLeavingRef.current = true;
        try {
            await leaveRoom(() => {
                isJoinedRef.current = false;
                setUserHasJoined(false);
            });
            isJoinedRef.current = false;
            setIsJoined(false);
            setUserHasJoined(false);
            joinedRoomIdRef.current = null;
        } catch (error) {
            console.error("Error leaving Zego room:", error);
            isJoinedRef.current = false;
            setIsJoined(false);
            setUserHasJoined(false);
            joinedRoomIdRef.current = null;
        } finally {
            isLeavingRef.current = false;
        }
    }, []);

    useEffect(() => {
        return () => {
            const roomId = joinedRoomIdRef.current;
            if (roomId && !isLeavingRef.current) {
                try {
                    leaveRoom();
                } catch (error) {
                    console.error("Error in cleanup leave room:", error);
                }
                isJoinedRef.current = false;
                joinedRoomIdRef.current = null;
                isJoiningRef.current = false;
                isLeavingRef.current = false;
            }
        };
    }, []);

    return {
        // State
        isJoined,
        userHasJoined,
        error,
        loading,
        containerRef,

        // Methods
        joinZegoRoom,
        leaveZegoRoom,
    };
};