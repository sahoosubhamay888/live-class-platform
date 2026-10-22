import { useEffect, useRef, useState, useCallback } from 'react'
import { useSession } from '../hooks/useSession';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useZego } from '../hooks/useZego';
import { APP_CONFIG, ROUTES } from '../utils/constants';
import toast from 'react-hot-toast';
import SessionHeader from '../components/session/SessionHeader';
import JoinForm from '../components/session/JoinForm';
import VideoContainer from '../components/session/VideoContainer';
import ParticipantsList from '../components/session/ParticipantsList';

const JoinSession = () => {
    const [roomId, setRoomId] = useState('')
    const [localError, setLocalError] = useState('')
    const [sessionJoined, setSessionJoined] = useState(false);
    const [sessionInfo, setSessionInfo] = useState(null);
    const zegoJoinedRef = useRef(false);
    const [searchParams] = useSearchParams();

    const { joinSession, getSession, leaveSession, loading, error } = useSession();
    const navigate = useNavigate();

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

    // Check if room id exists in URL PARAMS (do not set null)
    useEffect(() => {
        const urlRoomId = searchParams.get('roomId');
        if (urlRoomId) {
            setRoomId(urlRoomId.toUpperCase().trim());
        }
    }, [searchParams])

    // Handle input change
    const handleChange = (e) => {
        setRoomId(e.target.value.toUpperCase().trim());
        setLocalError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('')

        if (!roomId) {
            setLocalError('Please enter a room ID')
            return;
        }

        const result = await joinSession(roomId)

        if (result?.success) {
            setSessionInfo(result.session)
            setSessionJoined(true);

            if (result.session?.isHost) {
                navigate(`${ROUTES.HOST}?roomId=${roomId}`)
            }
        }
    }

    // Join Zego room safely with retry timer cleanup and mount guard
    useEffect(() => {
        if (!sessionJoined || !roomId || zegoJoinedRef.current) {
            return;
        }

        let isMounted = true;
        let retryTimeout = null;

        const joinZego = async () => {
            if (containerRef.current && isMounted && !zegoJoinedRef.current) {
                zegoJoinedRef.current = true;
                const zegoResult = await joinZegoRoom(roomId)
                if (!isMounted) return;

                if (!zegoResult.success) {
                    console.error("failed to join zego room ", zegoResult.error);
                    zegoJoinedRef.current = false;
                }
            } else if (isMounted && !zegoJoinedRef.current) {
                retryTimeout = setTimeout(joinZego, 200)
            }
        }

        joinZego();

        return () => {
            isMounted = false;
            if (retryTimeout) clearTimeout(retryTimeout);
            if (zegoJoinedRef.current) {
                leaveZegoRoom();
                zegoJoinedRef.current = false;
            }
            if (sessionJoined && roomId) {
                leaveSession(roomId);
            }
        }
    }, [sessionJoined, roomId, joinZegoRoom, leaveZegoRoom, containerRef])

    const handleLeave = useCallback(async () => {
        try {
            if (zegoJoinedRef.current) {
                await leaveZegoRoom();
                zegoJoinedRef.current = false;
            }
            if (sessionJoined && roomId) {
                await leaveSession(roomId);
            }
        } finally {
            navigate(ROUTES.DASHBOARD);
        }
    }, [sessionJoined, roomId, leaveZegoRoom, leaveSession, navigate]);

    const handleBack = () => {
        if (window.confirm("Leaving will exit the meeting. Do you want to return to the dashboard?")) {
            handleLeave();
        }
    };

    // Poll session info & detect if host ends the meeting
    useEffect(() => {
        if (!sessionJoined || !roomId) return;

        const interval = setInterval(async () => {
            const res = await getSession(roomId, true);
            if (res?.success && res?.session) {
                if (res.session.status === 'ended') {
                    toast.error("The host has ended this session.");
                    handleLeave();
                    return;
                }
                setSessionInfo(res.session);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [sessionJoined, roomId, getSession, handleLeave]);

    // Browser close / refresh cleanup
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (sessionJoined && roomId) {
                leaveSession(roomId);
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [sessionJoined, roomId, leaveSession]);

    return (
        <div className="relative min-h-screen bg-[#0B1120] text-slate-100 overflow-hidden">
            {/* ── Ambient background light architecture ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/3 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/15 via-teal-600/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
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
                title={APP_CONFIG.SESSION_CONTENT.HEADER.JOINING_TITLE}
                roomId={sessionJoined ? roomId : ''}
                onBack={sessionJoined ? handleBack : () => navigate(ROUTES.DASHBOARD)}
            />

            <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">
                {!sessionJoined ? (
                    <JoinForm
                        roomId={roomId}
                        error={error || localError}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        loading={loading}
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <VideoContainer
                                containerRef={containerRef}
                                isJoined={isJoined}
                                userHasJoined={userHasJoined}
                                zegoError={zegoError}
                                zegoLoading={zegoLoading}
                                onFullscreen={handleFullScreen}
                                onLeave={handleLeave}
                                leaveButtonText={
                                    APP_CONFIG.SESSION_CONTENT.VIDEO.LEAVE_BUTTON
                                }
                            />
                        </div>

                        <div className="lg:col-span-1">
                            <ParticipantsList
                                participants={sessionInfo?.participants || []}
                                hostName={sessionInfo?.hostName}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default JoinSession