import { FaCheck, FaCopy, FaInfoCircle } from "react-icons/fa";
import { APP_CONFIG } from "../../utils/constants";

const SessionInfoCard = ({
    roomId,
    shareableLink,
    status = "active",
    participantCount = 0,
    copied = false,
    copiedRoomId,
    copiedLink,
    onCopyRoomId,
    onCopyLink,
}) => {
    // Support separate states for both buttons with fallback to legacy `copied`
    const isRoomIdCopied = copiedRoomId !== undefined ? copiedRoomId : (copied === 'roomId' || copied === true);
    const isLinkCopied = copiedLink !== undefined ? copiedLink : (copied === 'link' || copied === true);

    return (
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-7 border border-white/[0.1]">
            <div className="flex items-center mb-6 pb-4 border-b border-white/[0.08]">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] mr-3">
                    <FaInfoCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                    {APP_CONFIG.SESSION_CONTENT.INFO_CARD.HEADING}
                </h2>
            </div>

            <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {APP_CONFIG.SESSION_CONTENT.INFO_CARD.ROOM_ID_LABEL}
                </label>

                <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={roomId || ''}
                            readOnly
                            className="w-full px-4 py-3 border border-white/[0.12] rounded-xl bg-slate-950/70 text-white font-mono text-base tracking-widest text-center focus:border-indigo-500 transition-colors shadow-inner select-all"
                        />
                    </div>
                    <button
                        onClick={onCopyRoomId}
                        className={`px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap shadow-md ${
                            isRoomIdCopied
                                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                    >
                        {isRoomIdCopied ? (
                            <span className="flex items-center">
                                <FaCheck className="w-3.5 h-3.5 mr-1.5" />
                                {APP_CONFIG.SESSION_CONTENT.INFO_CARD.COPIED_BUTTON}
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FaCopy className="w-3.5 h-3.5 mr-1.5" />
                                {APP_CONFIG.SESSION_CONTENT.INFO_CARD.COPY_BUTTON}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    {APP_CONFIG.SESSION_CONTENT.INFO_CARD.SHAREABLE_LINK_LABEL}
                </label>

                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={shareableLink || ''}
                        readOnly
                        className="flex-1 px-4 py-3 border border-white/[0.12] rounded-xl bg-slate-950/70 text-slate-300 text-xs sm:text-sm focus:border-purple-500 transition-colors shadow-inner select-all"
                    />
                    <button
                        onClick={onCopyLink}
                        className={`px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer whitespace-nowrap shadow-md ${
                            isLinkCopied
                                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                        }`}
                    >
                        {isLinkCopied ? (
                            <span className="flex items-center">
                                <FaCheck className="w-3.5 h-3.5 mr-1.5" />
                                Copied
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FaCopy className="w-3.5 h-3.5 mr-1.5" />
                                Copy
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/[0.08]">
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-4 rounded-2xl shadow-sm">
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                        {APP_CONFIG.SESSION_CONTENT.INFO_CARD.STATUS_LABEL}
                    </p>
                    <p className="text-xl font-black text-emerald-300 capitalize flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                        {status || "active"}
                    </p>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/25 p-4 rounded-2xl shadow-sm">
                    <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                        {APP_CONFIG.SESSION_CONTENT.INFO_CARD.PARTICIPANTS_LABEL}
                    </p>
                    <p className="text-xl font-black text-indigo-200">
                        {participantCount ?? 0}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SessionInfoCard;
