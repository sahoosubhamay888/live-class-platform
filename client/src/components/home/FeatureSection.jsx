import { APP_CONFIG } from '../../utils/constants'
import { FaComments, FaShieldAlt, FaUsers, FaVideo } from 'react-icons/fa'

const iconMap = {
    FaVideo: FaVideo,
    FaComments: FaComments,
    FaShieldAlt: FaShieldAlt,
    FaUsers: FaUsers
}

const colorMap = {
    blue: { gradient: 'from-blue-500 to-indigo-600', glow: 'rgba(59,130,246,0.15)', border: 'hover:border-blue-300' },
    green: { gradient: 'from-emerald-500 to-teal-600', glow: 'rgba(16,185,129,0.15)', border: 'hover:border-emerald-300' },
    purple: { gradient: 'from-purple-500 to-violet-600', glow: 'rgba(139,92,246,0.15)', border: 'hover:border-purple-300' },
    indigo: { gradient: 'from-amber-500 to-orange-600', glow: 'rgba(245,158,11,0.15)', border: 'hover:border-amber-300' },
}

const FeatureSection = () => {
    return (
        <section className='py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] relative overflow-hidden'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-20'>
                    <span className='inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200/70 text-xs font-semibold uppercase tracking-wider rounded-full mb-4 shadow-xs'>
                        Core Features
                    </span>
                    <h2 className='text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight'>
                        {APP_CONFIG.HOME_CONTENT.FEATURES.HEADING}
                    </h2>
                    <p className='text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed'>
                        {APP_CONFIG.HOME_CONTENT.FEATURES.DESCRIPTION}
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                    {APP_CONFIG.FEATURES.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon];
                        const colors = colorMap[feature.color] || colorMap.indigo;
                        return (
                            <div
                                key={index}
                                className={`feature-card group relative bg-white rounded-3xl p-8 border border-slate-200/90 ${colors.border} shadow-md shadow-slate-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden`}
                            >
                                <div
                                    className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none'
                                    style={{ background: `radial-gradient(circle at 30% 30%, ${colors.glow}, transparent 70%)` }}
                                />

                                <div className={`relative w-14 h-14 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-md shadow-indigo-500/15 group-hover:scale-110 transition-transform duration-300`}>
                                    {IconComponent && <IconComponent className='w-7 h-7' />}
                                </div>

                                <h3 className='relative text-xl font-bold text-slate-900 mb-2'>
                                    {feature.title}
                                </h3>

                                <p className='relative text-slate-600 text-sm leading-relaxed'>
                                    {feature.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeatureSection