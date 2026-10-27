import { useState } from 'react'
import {
    FaUsers,
    FaUserMinus,
    FaBan,
    FaEllipsisV,
    FaExclamationTriangle,
    FaSpinner,
    FaTimes,
} from 'react-icons/fa'
import { APP_CONFIG } from '../../utils/constants'

const ParticipantsList = ({
    participants = [],
    hostName,
    isHost = false,
    onKickParticipant,
    onBlockParticipant,
}) => {
    // Menu state: id of participant whose 3-dot dropdown is open
    const [openMenuUserId, setOpenMenuUserId] = useState(null);

    // Modal state: { type: 'kick' | 'block', participant: object } | null
    const [pendingAction, setPendingAction] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleConfirmAction = async () => {
        if (!pendingAction) return;
        const { type, participant } = pendingAction;
        const targetId = participant.userId || participant._id;

        setActionLoading(true);
        try {
            if (type === 'kick' && onKickParticipant) {
                await onKickParticipant(targetId, participant.userName);
            } else if (type === 'block' && onBlockParticipant) {
                await onBlockParticipant(targetId, participant.userName);
            }
            setPendingAction(null);
        } finally {
            setActionLoading(false);
        }
    };

    if (!participants || participants.length === 0) {
        return (
            <div className='bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/[0.1] sticky top-24'>
                <div className='flex items-center mb-4 pb-3 border-b border-white/[0.08]'>
                    <FaUsers className='w-5 h-5 mr-2.5 text-indigo-400' />
                    <h2 className='text-lg font-bold text-white tracking-tight'>
                        {APP_CONFIG.SESSION_CONTENT.PARTICIPANTS.HEADING}
                    </h2>
                </div>
                <div className='text-center py-6'>
                    <p className='text-sm text-slate-400 font-light'>
                        {APP_CONFIG.SESSION_CONTENT.PARTICIPANTS.EMPTY_MESSAGE}
                    </p>
                </div>
            </div>
        )
    }

    // Identify host by isHost property, role, or matching hostName
    const isHostParticipant = (p) => Boolean(p.isHost || p.role === 'host' || (hostName && p.userName === hostName));
    const hostParticipants = participants.filter(isHostParticipant);
    const otherParticipants = participants.filter((p) => !isHostParticipant(p));

    return (
        <div className='bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/[0.1] sticky top-24'>
            {/* Backdrop to close three-dot menu when clicking anywhere outside */}
            {openMenuUserId && (
                <div
                    className='fixed inset-0 z-20'
                    onClick={() => setOpenMenuUserId(null)}
                />
            )}

            <div className='flex items-center justify-between mb-4 pb-3 border-b border-white/[0.08]'>
                <div className='flex items-center'>
                    <FaUsers className='w-5 h-5 mr-2.5 text-indigo-400' />
                    <h2 className='text-lg font-bold text-white tracking-tight'>
                        {APP_CONFIG.SESSION_CONTENT.PARTICIPANTS.HEADING}
                    </h2>
                </div>
                <span className='px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300'>
                    {participants.length}
                </span>
            </div>

            <div className='space-y-3'>
                {hostParticipants.map((p, idx) => (
                    <div
                        key={p.userId || p._id || `host-${idx}`}
                        className='p-3.5 bg-gradient-to-r from-blue-950/60 to-indigo-950/60 rounded-2xl border border-indigo-500/30 shadow-md'
                    >
                        <div className='flex items-center'>
                            <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3 shadow-xs'>
                                <span className='text-white font-bold text-sm'>
                                    {p.userName?.charAt(0)?.toUpperCase() || 'H'}
                                </span>
                            </div>
                            <div>
                                <p className='font-bold text-white text-sm'>
                                    {p.userName}
                                </p>
                                <p className='text-xs text-indigo-300 font-medium'>
                                    {APP_CONFIG.SESSION_CONTENT.PARTICIPANTS.HOST_LABEL}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {otherParticipants.length > 0 && (
                    <div className='pt-2 border-t border-white/[0.08] text-sm text-slate-400 space-y-2'>
                        <span className='block mb-2 font-semibold text-xs uppercase tracking-wider text-slate-400'>
                            {APP_CONFIG.SESSION_CONTENT.PARTICIPANTS.JOINED_USERS_LABEL}
                        </span>

                        {otherParticipants.map((p, idx) => {
                            const pId = (p.userId || p._id || `user-${idx}`).toString();
                            const isMenuOpen = openMenuUserId === pId;

                            return (
                                <div
                                    key={pId}
                                    className='p-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.06] flex items-center justify-between transition-colors relative'
                                >
                                    <div className='flex items-center min-w-0 mr-2'>
                                        <div className='w-9 h-9 bg-slate-800 border border-white/[0.1] rounded-full flex items-center justify-center mr-3 text-slate-300 font-bold text-xs flex-shrink-0'>
                                            {p.userName?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div className='truncate'>
                                            <p className='font-semibold text-white text-sm truncate'>
                                                {p.userName}
                                            </p>
                                            <p className='text-xs text-slate-400'>
                                                {APP_CONFIG.SESSION_CONTENT.PARTICIPANTS.PARTICIPANT_LABEL}
                                            </p>
                                        </div>
                                    </div>

                                    {isHost && (
                                        <div className='relative z-30 flex-shrink-0'>
                                            <button
                                                type='button'
                                                onClick={() => setOpenMenuUserId(isMenuOpen ? null : pId)}
                                                title={`Moderation options for ${p.userName}`}
                                                className={`p-2 rounded-lg border transition-all cursor-pointer ${
                                                    isMenuOpen
                                                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                                                        : 'text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08]'
                                                }`}
                                            >
                                                <FaEllipsisV className='w-3.5 h-3.5' />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {isMenuOpen && (
                                                <div className='absolute right-0 top-full mt-1.5 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/[0.14] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] p-1.5 z-40 space-y-1 animate-in fade-in zoom-in-95 duration-150'>
                                                    {/* Option 1: Remove */}
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            setOpenMenuUserId(null);
                                                            setPendingAction({ type: 'kick', participant: p });
                                                        }}
                                                        className='w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:text-white hover:bg-amber-500/15 transition-all flex items-center gap-2.5 cursor-pointer group'
                                                    >
                                                        <FaUserMinus className='w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform' />
                                                        <div>
                                                            <div className='font-bold leading-tight'>Remove</div>
                                                            <div className='text-[10px] text-slate-400 font-normal leading-tight'>Can rejoin later</div>
                                                        </div>
                                                    </button>

                                                    {/* Option 2: Block */}
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            setOpenMenuUserId(null);
                                                            setPendingAction({ type: 'block', participant: p });
                                                        }}
                                                        className='w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-white hover:bg-rose-500/20 transition-all flex items-center gap-2.5 cursor-pointer group'
                                                    >
                                                        <FaBan className='w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform' />
                                                        <div>
                                                            <div className='font-bold leading-tight'>Block Forever</div>
                                                            <div className='text-[10px] text-rose-300/70 font-normal leading-tight'>Cannot rejoin session</div>
                                                        </div>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modern Top-Positioned Confirmation Popup (for both Remove & Block) */}
            {pendingAction && (
                <div
                    className='fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-12 px-4 bg-black/75 backdrop-blur-md transition-all duration-300'
                    onClick={() => !actionLoading && setPendingAction(null)}
                >
                    <div
                        className={`bg-slate-900/95 backdrop-blur-xl border rounded-3xl p-5 sm:p-6 max-w-md w-full relative text-left transform transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-6 ${
                            pendingAction.type === 'block'
                                ? 'border-rose-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(239,68,68,0.2)]'
                                : 'border-amber-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(245,158,11,0.15)]'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header: Icon + Title + Close Button */}
                        <div className='flex items-start justify-between mb-3.5'>
                            <div className='flex items-center gap-3'>
                                <div
                                    className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner ${
                                        pendingAction.type === 'block'
                                            ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
                                            : 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                                    }`}
                                >
                                    {pendingAction.type === 'block' ? (
                                        <FaBan className='w-5 h-5' />
                                    ) : (
                                        <FaExclamationTriangle className='w-5 h-5' />
                                    )}
                                </div>
                                <div>
                                    <h3 className='text-base sm:text-lg font-bold text-white tracking-tight'>
                                        {pendingAction.type === 'block' ? 'Block Participant Forever?' : 'Remove Participant?'}
                                    </h3>
                                    <p
                                        className={`text-xs font-medium ${
                                            pendingAction.type === 'block' ? 'text-rose-300/80' : 'text-amber-300/80'
                                        }`}
                                    >
                                        {pendingAction.type === 'block' ? 'Permanent Session Ban' : 'Temporary Moderation Action'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type='button'
                                onClick={() => !actionLoading && setPendingAction(null)}
                                className='p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer'
                                title='Close'
                            >
                                <FaTimes className='w-4 h-4' />
                            </button>
                        </div>

                        {/* Body description */}
                        <p className='text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 pl-1'>
                            {pendingAction.type === 'block' ? (
                                <>
                                    Are you sure you want to permanently block <strong className='text-white font-semibold'>{pendingAction.participant.userName}</strong>? They will be immediately thrown out of the video room and barred forever from rejoining this session.
                                </>
                            ) : (
                                <>
                                    Are you sure you want to remove <strong className='text-white font-semibold'>{pendingAction.participant.userName}</strong> from this live class? They will be disconnected from the call, but can rejoin later if permitted.
                                </>
                            )}
                        </p>

                        {/* Action buttons */}
                        <div className='flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]'>
                            <button
                                type='button'
                                onClick={() => setPendingAction(null)}
                                disabled={actionLoading}
                                className='px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                onClick={handleConfirmAction}
                                disabled={actionLoading}
                                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50 ${
                                    pendingAction.type === 'block'
                                        ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:shadow-[0_0_25px_rgba(239,68,68,0.55)]'
                                        : 'bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 hover:shadow-[0_0_25px_rgba(244,63,94,0.45)]'
                                }`}
                            >
                                {actionLoading ? (
                                    <>
                                        <FaSpinner className='animate-spin w-3.5 h-3.5' />
                                        <span>{pendingAction.type === 'block' ? 'Blocking...' : 'Removing...'}</span>
                                    </>
                                ) : (
                                    <>
                                        {pendingAction.type === 'block' ? (
                                            <>
                                                <FaBan className='w-3.5 h-3.5' />
                                                <span>Block Permanently</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaUserMinus className='w-3.5 h-3.5' />
                                                <span>Remove Participant</span>
                                            </>
                                        )}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ParticipantsList
