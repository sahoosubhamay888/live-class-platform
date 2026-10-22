import { APP_CONFIG } from "../../utils/constants";
import { FaCircle, FaExternalLinkAlt, FaSpinner } from "react-icons/fa";
import { formatDate } from "../../utils/helper";

const SessionList = ({
    sessions,
    loading,
    statusFilter,
    onFilterChange,
    onRejoinSession,
}) => {
    const statusBadge = (status) => {
        const map = {
            active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
            ended: "bg-slate-700/60 text-slate-200 border border-slate-600/70",
        };
        return map[status] || "bg-slate-700/60 text-slate-200 border border-slate-600/70";
    };

    return (
        <div className="mt-16 max-w-5xl mx-auto bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/[0.1] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                    <h3 className="text-2xl text-white font-black tracking-tight">
                        {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.HEADING}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 font-light">
                        {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.DESCRIPTION}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <label className="text-sm font-medium text-slate-300">Filter:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="py-2 px-3.5 bg-slate-950/80 border border-white/[0.15] text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium cursor-pointer"
                    >
                        <option value="all">
                            {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.FILTER_ALL}
                        </option>
                        <option value="active">
                            {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.FILTER_ACTIVE}
                        </option>
                        <option value="ended">
                            {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.FILTER_ENDED}
                        </option>
                    </select>
                </div>
            </div>

            {loading && sessions.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-slate-400">
                    <FaSpinner className="animate-spin h-6 w-6 mr-3 text-indigo-400" />
                    <span className="text-sm font-medium">{APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.LOADING}</span>
                </div>
            ) : sessions.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.02] rounded-2xl border border-white/[0.05] text-slate-400 text-sm font-light">
                    {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.EMPTY}
                </div>
            ) : (
                <div className="space-y-4">
                    {sessions.map((s) => (
                        <div
                            key={s.id}
                            className="border border-white/[0.08] bg-slate-950/40 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-indigo-500/30 hover:bg-slate-950/60 transition-all duration-200"
                        >
                            <div>
                                <div className="flex items-center space-x-2.5">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(s.status)}`}
                                    >
                                        <FaCircle className={`w-2 h-2 mr-1.5 ${s.status === 'active' ? 'animate-pulse text-emerald-400' : 'text-slate-500'}`} />
                                        {s.status}
                                    </span>
                                    {s.isHost && (
                                        <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full">
                                            Host
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2 text-lg font-bold text-white font-mono tracking-wide">
                                    Room : {s.roomId}
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                    Host: <span className="text-slate-300 font-medium">{s.hostName}</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                    Started: {s.startedAt ? formatDate(s.startedAt) : "N/A"}
                                    {s.endedAt && <> · Ended: {formatDate(s.endedAt)}</>}
                                </div>
                            </div>
                            <div className="flex items-center sm:self-center">
                                {s.status === "active" ? (
                                    <button
                                        onClick={() => onRejoinSession(s)}
                                        className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer"
                                    >
                                        {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.REJOIN_BUTTON}
                                        <FaExternalLinkAlt className="w-3.5 h-3.5 ml-2" />
                                    </button>
                                ) : (
                                    <span className="inline-flex items-center px-4 py-2 bg-slate-700/80 text-white border border-slate-500/60 rounded-xl text-xs sm:text-sm font-bold tracking-wide shadow-md backdrop-blur-md select-none cursor-default">
                                        <span className="w-2 h-2 rounded-full bg-rose-400 mr-2 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                                        {APP_CONFIG.DASHBOARD_CONTENT.SESSIONS_LIST.ENDED_BUTTON}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SessionList;