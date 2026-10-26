import { useState } from 'react'
import { FaUsers, FaUserMinus, FaExclamationTriangle, FaSpinner, FaTimes } from 'react-icons/fa'
import { APP_CONFIG } from '../../utils/constants'

const ParticipantsList = ({
    participants = [],
    hostName,
    isHost = false,
    onKickParticipant,
}) => {
    const [participantToKick, setParticipantToKick] = useState(null);
    const [kickLoading, setKickLoading] = useState(false);

    const handleConfirmKick = async () => {
        if (!participantToKick || !onKickParticipant) return;
        setKickLoading(true);
        try {
            const targetId = participantToKick.userId || participantToKick._id;
            await onKickParticipant(targetId, participantToKick.userName);
            setParticipantToKick(null);
        } finally {
            setKickLoading(false);
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

                        {otherParticipants.map((p, idx) => (
                            <div
                                key={p.userId || p._id || `user-${idx}`}
                                className='p-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.06] flex items-center justify-between transition-colors'
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
                                    <button
                                        type='button'
                                        onClick={() => setParticipantToKick(p)}
                                        title={`Remove ${p.userName} from session`}
                                        className='px-2.5 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600/90 border border-rose-500/20 hover:border-rose-500 rounded-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer flex-shrink-0 hover:scale-105 active:scale-95'
                                    >
                                        <FaUserMinus className='w-3 h-3' />
                                        <span>Remove</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modern Top-Positioned Confirmation Popup */}
            {participantToKick && (
                <div
                    className='fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-12 px-4 bg-black/75 backdrop-blur-md transition-all duration-300'
                    onClick={() => !kickLoading && setParticipantToKick(null)}
                >
                    <div
                        className='bg-slate-900/95 backdrop-blur-xl border border-white/[0.16] rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(244,63,94,0.12)] relative text-left transform transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-6'
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header: Icon + Title + Close Button */}
                        <div className='flex items-start justify-between mb-3.5'>
                            <div className='flex items-center gap-3'>
                                <div className='w-11 h-11 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 flex-shrink-0 shadow-inner'>
                                    <FaExclamationTriangle className='w-5 h-5' />
                                </div>
                                <div>
                                    <h3 className='text-base sm:text-lg font-bold text-white tracking-tight'>
                                        Remove Participant?
                                    </h3>
                                    <p className='text-xs text-rose-300/80 font-medium'>
                                        Host Moderation Action
                                    </p>
                                </div>
                            </div>
                            <button
                                type='button'
                                onClick={() => !kickLoading && setParticipantToKick(null)}
                                className='p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors cursor-pointer'
                                title='Close'
                            >
                                <FaTimes className='w-4 h-4' />
                            </button>
                        </div>

                        <p className='text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 pl-1'>
                            Are you sure you want to remove <strong className='text-white font-semibold'>{participantToKick.userName}</strong> from this live class?
                        </p>

                        <div className='flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.08]'>
                            <button
                                type='button'
                                onClick={() => setParticipantToKick(null)}
                                disabled={kickLoading}
                                className='px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                onClick={handleConfirmKick}
                                disabled={kickLoading}
                                className='px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-red-600 to-rose-600 hover:shadow-[0_0_25px_rgba(239,68,68,0.45)] transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50'
                            >
                                {kickLoading ? (
                                    <>
                                        <FaSpinner className='animate-spin w-3.5 h-3.5' />
                                        <span>Removing...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaUserMinus className='w-3.5 h-3.5' />
                                        <span>Remove</span>
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
