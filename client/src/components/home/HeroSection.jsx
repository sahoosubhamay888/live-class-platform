import { useAuth } from "../../hooks/useAuth";
import { FaArrowRight, FaCheckCircle, FaRocket } from "react-icons/fa";
import { APP_CONFIG, ROUTES } from "../../utils/constants";
import { Link } from "react-router-dom";

const HeroSection = () => {
    const { isAuthenticated } = useAuth();
    return (
        <section className="relative pt-36 pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0B1120] via-[#0F172A] to-[#1E1B4B]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-blue-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-24 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-44 -left-32 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div
                className="absolute inset-0 opacity-[0.2] pointer-events-none -z-10"
                style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-indigo-200 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-[0_0_25px_rgba(99,102,241,0.25)]">
                        <span className="flex items-center justify-center w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white shadow-xs">
                            <FaRocket className="w-2.5 h-2.5" />
                        </span>
                        {APP_CONFIG.HOME_CONTENT.HERO.BADGE_TEXT}
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                        {APP_CONFIG.HOME_CONTENT.HERO.HEADING}
                        <span className="block gradient-text mt-3">
                            {APP_CONFIG.HOME_CONTENT.HERO.HEADING_HIGHLIGHT}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        {APP_CONFIG.HOME_CONTENT.HERO.SUBHEADING}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {isAuthenticated ? (
                            <Link
                                to={ROUTES.DASHBOARD}
                                className="group inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                            >
                                {APP_CONFIG.HOME_CONTENT.HERO.CTA_AUTHENTICATED}
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to={ROUTES.REGISTER}
                                    className="group inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
                                >
                                    {APP_CONFIG.HOME_CONTENT.HERO.CTA_PRIMARY}
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>

                                <Link
                                    to={ROUTES.LOGIN}
                                    className="inline-flex items-center gap-2 px-9 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-semibold text-base sm:text-lg backdrop-blur-md hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg"
                                >
                                    {APP_CONFIG.HOME_CONTENT.HERO.CTA_SECONDARY}
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="mt-14 flex flex-wrap justify-center items-center gap-6 sm:gap-8">
                        {APP_CONFIG.TRUST_INDICATORS.map((indicator, index) => (
                            <div key={index} className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                <FaCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                <span>{indicator}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
                <svg className="relative block w-full h-12 sm:h-16 md:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0 C300,90 900,90 1200,0 L1200,120 L0,120 Z" fill="#F8FAFC" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;