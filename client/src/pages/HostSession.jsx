import { useEffect, useRef, useState } from "react";
import { useSession } from "../hooks/useSession";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useZego } from "../hooks/useZego";
import api from '../service/api'
import { API_ENDPOINTS, APP_CONFIG, ROUTES } from "../utils/constants";
import { copyToClipboard } from "../utils/helper";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import SessionHeader from "../components/session/SessionHeader";
import SessionInfoCard from "../components/session/SessionInfoCard";
import VideoContainer from "../components/session/VideoContainer";
import ParticipantsList from "../components/session/ParticipantsList";

const HostSession = () => {
    const [sessionInfo, setSessionInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copiedRoomId, setCopiedRoomId] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [lockLoading, setLockLoading] = useState(false);
    const { currentSession, getSession, leaveSession, clearSession, kickParticipant, blockParticipant, toggleLockSession } = useSession();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const zegoJoinedRef = useRef(false);

    const roomId = searchParams.get("roomId") || currentSession?.roomId;

    const {
        isJoined,
        userHasJoined,
        error: zegoError,
        loading: zegoLoading,
        containerRef,
        joinZegoRoom,
        leaveZegoRoom,
    } = useZego();

    const handleFullScreen = () => {
        const videoContainer = containerRef.current;
        if (!videoContainer) return;
        if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => { });
        } else {
            videoContainer.requestFullscreen?.().catch(() => { });
        }
    };

    // Load session information and verify host permission
    useEffect(() => {
        let isMounted = true;
        const loadSession = async () => {
            if (!roomId) {
                navigate(ROUTES.DASHBOARD);
                return;
            }

            setLoading(true);
            const result = await getSession(roomId);

            if (!isMounted) return;

            if (result?.success && result?.session) {
                // If user is not the host, redirect to join page
                if (!result.session.isHost) {
                    toast.error("You are not the host of this session");
                    navigate(`${ROUTES.JOIN}?roomId=${roomId}`);
                    return;
                }
                setSessionInfo(result.session);
            } else {
                toast.error("Session not found or already ended");
                navigate(ROUTES.DASHBOARD);
            }
            setLoading(false);
        }

        loadSession();

        return () => {
            isMounted = false;
        }
    }, [roomId, getSession, navigate])

    // Join Zego room after container is mounted and session is loaded
    useEffect(() => {
        if (!sessionInfo || !roomId || zegoJoinedRef.current) {
            return;
        }

        let isMounted = true;
        let retryTimeout = null;

        const joinZego = async () => {
            if (containerRef.current && isMounted && !zegoJoinedRef.current) {
                zegoJoinedRef.current = true;
                const zegoResult = await joinZegoRoom(roomId);
                if (!isMounted) return;

                if (!zegoResult.success) {
                    console.error("failed to join zego room ", zegoResult.error);
                    zegoJoinedRef.current = false;
                }
            } else if (isMounted && !zegoJoinedRef.current) {
                retryTimeout = setTimeout(joinZego, 200);
            }
        };

        joinZego();

        return () => {
            isMounted = false;
            if (retryTimeout) clearTimeout(retryTimeout);
            if (zegoJoinedRef.current) {
                leaveZegoRoom();
                zegoJoinedRef.current = false;
            }
        };
    }, [sessionInfo?.id, roomId, joinZegoRoom, leaveZegoRoom, containerRef])

    // Poll participants and status
    useEffect(() => {
        if (!roomId) return;
        const interval = setInterval(async () => {
            const res = await getSession(roomId, true);
            if (res?.success && res?.session) {
                setSessionInfo((prev) => {
                    if (
                        prev &&
                        prev.participantCount === res.session.participantCount &&
                        prev.status === res.session.status &&
                        JSON.stringify(prev.participants) === JSON.stringify(res.session.participants)
                    ) {
                        return prev;
                    }
                    return res.session;
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [roomId, getSession]);


    const handleCopyRoomId = async () => {
        if (roomId) {
            const success = await copyToClipboard(roomId);
            if (success) {
                setCopiedRoomId(true);
                setTimeout(() => setCopiedRoomId(false), 2000);
            }
        }
    };

    // Clean URL without double slashes
    const getShareableLink = () => {
        const baseURL = window.location.origin;
        return `${baseURL}${ROUTES.JOIN}?roomId=${roomId}`;
    };

    const handleCopyLink = async () => {
        const link = getShareableLink();
        const success = await copyToClipboard(link);
        if (success) {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        }
    };

    // End session with host confirmation
    const handleEndSession = async () => {
        if (!sessionInfo?.isHost) return;

        const confirmed = window.confirm("Are you sure you want to end this session for all participants?");
        if (!confirmed) return;

        try {
            if (zegoJoinedRef.current) {
                await leaveZegoRoom();
                zegoJoinedRef.current = false;
            }

            await api.post(`${API_ENDPOINTS.SESSION.END}/${sessionInfo.id}`);
            clearSession();
            toast.success("Session ended successfully");
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            toast.error("Failed to end session. Please try again");
        }
    };

    const handleLeave = async () => {
        if (sessionInfo?.isHost) {
            await handleEndSession();
        } else {
            try {
                if (zegoJoinedRef.current) {
                    await leaveZegoRoom();
                    zegoJoinedRef.current = false;
                }
                await leaveSession(roomId);
            } finally {
                navigate(ROUTES.DASHBOARD);
            }
        }
    };

    const handleBack = () => {
        if (window.confirm("Leaving will exit the meeting. Do you want to return to the dashboard?")) {
            handleLeave();
        }
    };

    const handleKickParticipant = async (targetUserId, targetUserName) => {
        try {
            const res = await kickParticipant(roomId, targetUserId);
            if (res.success) {
                toast.success(`${targetUserName} has been removed from the session`);
                setSessionInfo((prev) => {
                    if (!prev) return prev;
                    const filtered = prev.participants.filter(
                        (p) => (p.userId || p._id).toString() !== targetUserId.toString()
                    );
                    return {
                        ...prev,
                        participantCount: filtered.length,
                        participants: filtered,
                    };
                });
            } else {
                toast.error(res.error || "Failed to remove participant");
            }
        } catch (err) {
            toast.error("Failed to remove participant. Please try again.");
        }
    };


    const handleBlockParticipant = async (targetUserId, targetUserName) => {
        try {
            const res = await blockParticipant(roomId, targetUserId);
            if (res.success) {
                toast.success(`${targetUserName} has been permanently blocked from the session`);
                setSessionInfo((prev) => {
                    if (!prev) return prev;
                    const filtered = prev.participants.filter(
                        (p) => (p.userId || p._id).toString() !== targetUserId.toString()
                    );
                    return {
                        ...prev,
                        participantCount: filtered.length,
                        participants: filtered,
                    };
                });
            } else {
                toast.error(res.error || "Failed to block participant");
            }
        } catch (err) {
            toast.error("Failed to block participant. Please try again.");
        }
    };


    const handleToggleLock = async () => {
        if (!roomId || lockLoading) return;
        setLockLoading(true);
        try {
            const nextLock = !sessionInfo?.isLocked;
            const res = await toggleLockSession(roomId, nextLock);
            if (res.success) {
                setSessionInfo((prev) => (prev ? { ...prev, isLocked: res.isLocked } : prev));
                if (res.isLocked) {
                    toast.success('Session locked: new participants cannot join');
                } else {
                    toast.success('Session unlocked: participants can now join');
                }
            } else {
                toast.error(res.error || 'Failed to toggle room lock');
            }
        } catch (err) {
            toast.error('An error occurred while updating room lock state');
        } finally {
            setLockLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
                <div className="text-center">
                    <FaSpinner className="animate-spin h-12 w-12 text-indigo-500 mx-auto" />
                    <p className="mt-4 text-slate-300 font-medium">
                        {APP_CONFIG.LOADING_MESSAGES.SESSION}
                    </p>
                </div>
            </div>
        );
    }

    if (!sessionInfo) {
        return null;
    }

    return (
        <div className="relative min-h-screen bg-[#0B1120] text-slate-100 overflow-hidden">
            {/* ── Ambient background light architecture ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/3 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/15 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* ── Dot grid texture ── */}
            <div
                className="absolute inset-0 opacity-[0.18] pointer-events-none -z-10"
                style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <SessionHeader
                title={APP_CONFIG.SESSION_CONTENT.HEADER.HOSTING_TITLE}
                roomId={roomId}
                userName={user?.name}
                onBack={handleBack}
                showEndButton={sessionInfo.isHost}
                onEndSession={handleEndSession}
            />

            <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <SessionInfoCard
                            roomId={roomId}
                            shareableLink={getShareableLink()}
                            status={sessionInfo.status}
                            participantCount={sessionInfo.participantCount}
                            copiedRoomId={copiedRoomId}
                            copiedLink={copiedLink}
                            onCopyRoomId={handleCopyRoomId}
                            onCopyLink={handleCopyLink}
                            isHost={true}
                            isLocked={sessionInfo.isLocked}
                            onToggleLock={handleToggleLock}
                            lockLoading={lockLoading}
                        />

                        <VideoContainer
                            containerRef={containerRef}
                            isJoined={isJoined}
                            userHasJoined={userHasJoined}
                            zegoError={zegoError}
                            zegoLoading={zegoLoading}
                            onFullscreen={handleFullScreen}
                            onLeave={handleLeave}
                            leaveButtonText={
                                sessionInfo?.isHost
                                    ? APP_CONFIG.SESSION_CONTENT.VIDEO.END_BUTTON
                                    : APP_CONFIG.SESSION_CONTENT.VIDEO.LEAVE_BUTTON
                            }
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <ParticipantsList
                            participants={sessionInfo?.participants || []}
                            hostName={sessionInfo?.hostName}
                            isHost={true}
                            onKickParticipant={handleKickParticipant}
                            onBlockParticipant={handleBlockParticipant}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HostSession;
