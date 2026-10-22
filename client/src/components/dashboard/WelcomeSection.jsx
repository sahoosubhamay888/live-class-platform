import { APP_CONFIG } from '../../utils/constants'

const WelcomeSection = ({ userName }) => {
    return (
        <div className='text-center mb-12'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]'>
                <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                <span>Live Classroom Studio</span>
            </div>

            <h2 className='text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight'>
                {APP_CONFIG.DASHBOARD_CONTENT.WELCOME.GREETING.replace('{userName}', userName || 'Educator')}
            </h2>

            <p className='text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed'>
                {APP_CONFIG.DASHBOARD_CONTENT.WELCOME.DESCRIPTION}
            </p>
        </div>
    )
}

export default WelcomeSection