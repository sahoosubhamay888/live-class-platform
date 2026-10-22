import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import ActionCard from "../components/dashboard/ActionCard";
import FeaturesGrid from "../components/dashboard/FeaturesGrid";
import SessionList from "../components/dashboard/SessionList";
import { useSession } from "../hooks/useSession";
import { FaExclamationCircle } from "react-icons/fa";

const Dashboard = () => {
    const { user } = useAuth();
    const { createSession, listSessions, error, loading } = useSession();
    const navigate = useNavigate();
    const [creating, setCreating] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");

    const handleCreateSession = async () => {
        setCreating(true);
        const result = await createSession();
        if (result.success) {
            navigate(`${ROUTES.HOST}?roomId=${result.session.roomId}`);
        }
        setCreating(false);
    }

    useEffect(() => {
        const load = async () => {
            const result = await listSessions(statusFilter);
            if (result.success) {
                setSessions(result.sessions);
            }
        };
        load();
    }, [listSessions, statusFilter]);

    const handleRejoinSession = (session) => {
        if (session.status === "active") {
            if (session.isHost) {
                navigate(`${ROUTES.HOST}?roomId=${session.roomId}`);
            } else {
                navigate(`${ROUTES.JOIN}?roomId=${session.roomId}`);
            }
        }
    };

    const handleJoinSession = () => {
        navigate(ROUTES.JOIN);
    };

    return (
        <div className="relative min-h-screen bg-[#0B1120] text-slate-100 overflow-hidden">
            {/* ── Ambient background light architecture ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-b from-blue-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob" />
                <div className="absolute bottom-10 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            {/* ── Modern dot grid texture ── */}
            <div
                className="absolute inset-0 opacity-[0.2] pointer-events-none -z-10"
                style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <WelcomeSection userName={user?.name} />

                {error && (
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-4 rounded-2xl shadow-lg backdrop-blur-md">
                            <div className="flex items-center">
                                <FaExclamationCircle className="w-5 h-5 mr-3 flex-shrink-0 text-rose-400" />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        </div>
                    </div>
                )}

                <ActionCard
                    onCreateSession={handleCreateSession}
                    onJoinSession={handleJoinSession}
                    creating={creating}
                />

                <FeaturesGrid />

                <SessionList
                    sessions={sessions}
                    loading={loading}
                    statusFilter={statusFilter}
                    onFilterChange={setStatusFilter}
                    onRejoinSession={handleRejoinSession}
                />
            </main>
        </div>
    );
};

export default Dashboard;