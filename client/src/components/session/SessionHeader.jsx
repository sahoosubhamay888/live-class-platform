import { FaArrowLeft } from 'react-icons/fa'
import { APP_CONFIG } from '../../utils/constants'

const SessionHeader = ({
    title,
    roomId,
    userName,
    onBack,
    showEndButton,
    showEndBUtton,
    onEndSession
}) => {
    // Normalizes casing typo while keeping backwards compatibility
    const shouldShowEnd = Boolean(showEndButton || showEndBUtton);

    return (
        <header className='bg-[#0B1120]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20 text-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center space-x-3 sm:space-x-4'>
                        <button
                            onClick={onBack}
                            className='p-2.5 text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer'
                            title="Back"
                        >
                            <FaArrowLeft className='w-4 h-4' />
                        </button>
                        <div>
                            <h1 className='text-base sm:text-xl font-bold text-white tracking-tight'>
                                {title}
                            </h1>
                            {roomId && (
                                <p className='text-xs text-slate-400 mt-0.5 flex items-center gap-1.5'>
                                    <span>Room ID:</span>
                                    <span className='font-mono font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2 py-0.5 rounded-md'>
                                        {roomId}
                                    </span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center space-x-3 sm:space-x-4'>
                        {userName && (
                            <div className='hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.1] rounded-xl backdrop-blur-sm'>
                                <div className='w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xs'>
                                    <span className='text-white text-xs font-bold'>
                                        {userName?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className='text-slate-200 font-medium text-xs sm:text-sm'>
                                    {userName}
                                </span>
                            </div>
                        )}

                        {shouldShowEnd && (
                            <button
                                onClick={onEndSession}
                                className='px-4 py-2 text-xs sm:text-sm font-semibold text-rose-200 bg-rose-500/20 border border-rose-500/40 rounded-xl hover:bg-rose-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer whitespace-nowrap'
                            >
                                {APP_CONFIG.SESSION_CONTENT.HEADER.END_SESSION_BUTTON}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default SessionHeader
