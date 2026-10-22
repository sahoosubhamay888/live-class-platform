import { useAuth } from '../../hooks/useAuth'
import { APP_CONFIG, ROUTES } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const CTASection = () => {
    const { isAuthenticated } = useAuth();
    return (
        <section className='py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] relative overflow-hidden'>
            <div className='relative max-w-6xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-16 sm:px-14 sm:py-20 text-center shadow-2xl shadow-indigo-600/25'>
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute -top-24 -left-24 w-80 h-80 bg-white/15 rounded-full blur-3xl' />
                    <div className='absolute -bottom-24 -right-24 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl' />
                </div>

                <div
                    className='absolute inset-0 opacity-[0.08] pointer-events-none'
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                        backgroundSize: '36px 36px'
                    }}
                />

                <div className='relative max-w-3xl mx-auto'>
                    <span className='inline-block px-4 py-1.5 bg-white/20 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-6 backdrop-blur-md shadow-xs'>
                        Get Started Today
                    </span>

                    <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight'>
                        {APP_CONFIG.HOME_CONTENT.CTA.HEADING}
                    </h2>

                    <p className='text-base sm:text-lg text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light'>
                        {APP_CONFIG.HOME_CONTENT.CTA.DESCRIPTION.replace('{APP_NAME}', APP_CONFIG.APP_NAME)}
                    </p>

                    {isAuthenticated ? (
                        <Link
                            to={ROUTES.DASHBOARD}
                            className='group inline-flex items-center gap-3 px-10 py-4 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-indigo-950/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300'
                        >
                            {APP_CONFIG.HOME_CONTENT.CTA.BUTTON_AUTHENTICATED}
                            <FaArrowRight className='group-hover:translate-x-1 transition-transform duration-300' />
                        </Link>
                    ) : (
                        <Link
                            to={ROUTES.REGISTER}
                            className='group inline-flex items-center gap-3 px-10 py-4 bg-white text-indigo-700 hover:bg-indigo-50 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-indigo-950/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300'
                        >
                            {APP_CONFIG.HOME_CONTENT.CTA.BUTTON_GUEST}
                            <FaArrowRight className='group-hover:translate-x-1 transition-transform duration-300' />
                        </Link>
                    )}

                    <p className='mt-6 text-indigo-100/90 text-xs sm:text-sm font-medium'>No credit card required · Free forever</p>
                </div>
            </div>
        </section>
    )
}

export default CTASection