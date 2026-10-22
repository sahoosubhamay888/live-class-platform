import { FaUsers } from 'react-icons/fa'
import { APP_CONFIG } from '../../utils/constants'

const ParticipantsList = ({ participants = [], hostName }) => {
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
                                className='p-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl border border-white/[0.06] flex items-center transition-colors'
                            >
                                <div className='w-9 h-9 bg-slate-800 border border-white/[0.1] rounded-full flex items-center justify-center mr-3 text-slate-300 font-bold text-xs'>
                                    {p.userName?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className='font-semibold text-white text-sm'>
                                        {p.userName}
                                    </p>
                                    <p className='text-xs text-slate-400'>
                                        {APP_CONFIG.SESSION_CONTENT.PARTICIPANTS.PARTICIPANT_LABEL}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ParticipantsList
