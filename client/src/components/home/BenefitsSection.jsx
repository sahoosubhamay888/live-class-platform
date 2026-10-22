import { APP_CONFIG } from '../../utils/constants'
import { FaCheckCircle, FaPlay, FaUsers } from 'react-icons/fa';

const BenefitsSection = () => {
    const benefits = APP_CONFIG.BENEFITS;
    return (
        <section className='relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0B0F19] text-white overflow-hidden'>
            <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
                <svg className="relative block w-full h-8 sm:h-12 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0 L1200,0 L1200,20 C800,100 400,100 0,20 Z" fill="#F8FAFC" />
                </svg>
            </div>

            <div className='absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none' />
            <div className='absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none' />

            <div className='max-w-7xl mx-auto pt-6 sm:pt-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <div className='relative'>
                        <div className='relative bg-gradient-to-br from-slate-900/95 via-indigo-950/85 to-slate-900/95 rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)] border border-white/[0.12] overflow-hidden animate-float'
                            style={{ boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)' }}>
                            <div
                                className='absolute inset-0 opacity-15'
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                                                      linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                                    backgroundSize: '30px 30px'
                                }}
                            />

                            <div className='relative aspect-video bg-slate-950/90 rounded-2xl backdrop-blur-md border border-white/10 flex flex-col items-center justify-center p-4 overflow-hidden shadow-2xl'>
                                <div className='absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10'>
                                    <div className='flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 shadow-md'>
                                        <FaUsers className='w-3 h-3 text-indigo-300' />
                                        <span className='text-white text-[11px] sm:text-xs font-medium'>24 participants</span>
                                    </div>

                                    <div className='flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/15 shadow-md'>
                                        <span className='w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]' />
                                        <span className='text-white text-[11px] sm:text-xs font-semibold'>LIVE</span>
                                    </div>
                                </div>

                                <div className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center border border-white/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300 cursor-pointer shadow-[0_0_30px_rgba(99,102,241,0.6)]'>
                                    <FaPlay className='w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5 sm:ml-1' />
                                </div>

                                <p className='text-slate-300 text-xs sm:text-sm font-medium tracking-wide mt-2 sm:mt-3 text-center'>
                                    Live Interactive Classroom
                                </p>
                            </div>

                            <div className='relative mt-4 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-3'>
                                {['Ultra HD Video', 'Instant Chat', 'Bank-Grade Secure'].map((label) => (
                                    <div key={label} className='bg-white/[0.05] rounded-xl py-2 px-1.5 sm:px-3 text-center border border-white/[0.08] backdrop-blur-sm'>
                                        <p className='text-slate-200 text-[11px] sm:text-xs font-semibold truncate'>{label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='absolute -top-10 -right-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none' />
                        <div className='absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none' />
                    </div>

                    <div>
                        <span className='inline-block px-4 py-1.5 bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider rounded-full mb-4 shadow-sm'>
                            Why Choose Us
                        </span>

                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight tracking-tight'>
                            {APP_CONFIG.HOME_CONTENT.BENEFITS.HEADING.replace('{APP_NAME}', APP_CONFIG.APP_NAME)}
                        </h2>

                        <p className='text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-light'>
                            {APP_CONFIG.HOME_CONTENT.BENEFITS.DESCRIPTION}
                        </p>

                        <ul className='space-y-4'>
                            {benefits.map((benefit, index) => (
                                <li key={index} className='flex items-center gap-4 group'>
                                    <div className='flex-shrink-0 w-8 h-8 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/25 transition-colors duration-200 shadow-[0_0_12px_rgba(52,211,153,0.2)]'>
                                        <FaCheckCircle className='w-4 h-4 text-emerald-400' />
                                    </div>
                                    <span className='text-slate-200 font-medium group-hover:text-white transition-colors text-sm sm:text-base'>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection