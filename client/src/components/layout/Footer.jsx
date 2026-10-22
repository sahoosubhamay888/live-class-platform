import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaVideo,
} from "react-icons/fa";
import { APP_CONFIG, ROUTES } from "../../utils/constants";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Footer = () => {
    const { isAuthenticated } = useAuth();
    const currentYear = new Date().getFullYear();

    const quickLinks = isAuthenticated
        ? [
            ...APP_CONFIG.FOOTER_LINKS.QUICK_LINKS.filter(
                (link) => link.route !== ROUTES.LOGIN && link.route !== ROUTES.REGISTER
            )
        ]
        : [
            ...APP_CONFIG.FOOTER_LINKS.QUICK_LINKS.filter(
                (link) => link.route !== ROUTES.DASHBOARD
            )
        ]
    return (
        <footer className="relative bg-[#0B1120] text-slate-300 pt-16 pb-12 overflow-hidden border-t border-white/[0.08]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent pointer-events-none" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="inline-flex items-center space-x-3 group mb-5">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] group-hover:scale-105 transition-transform duration-300">
                                <FaVideo className="w-5 h-5" />
                            </div>

                            <h3 className="text-2xl font-black text-white tracking-tight">
                                {APP_CONFIG.APP_NAME}
                            </h3>
                        </Link>

                        <p className="text-slate-400 mb-6 max-w-md text-sm leading-relaxed font-light">
                            {APP_CONFIG.APP_DESCRIPTION}
                        </p>

                        <div className="flex items-center space-x-3">
                            <a
                                href={APP_CONFIG.SOCIAL_LINKS.GITHUB}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:border-transparent flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                                aria-label="Github"
                            >
                                <FaGithub className="w-4 h-4" />
                            </a>

                            <a
                                href={APP_CONFIG.SOCIAL_LINKS.TWITTER}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:border-transparent flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-4 h-4" />
                            </a>

                            <a
                                href={APP_CONFIG.SOCIAL_LINKS.LINKEDIN}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:border-transparent flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-4 h-4" />
                            </a>

                            <a
                                href={APP_CONFIG.SOCIAL_LINKS.EMAIL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-400 hover:text-white hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 hover:border-transparent flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300"
                                aria-label="Email"
                            >
                                <FaEnvelope className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            Quick Links
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    {link.isExternal ? (
                                        <a
                                            href={link.route}
                                            className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-normal"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.route}
                                            className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-normal"
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            Support
                        </h4>
                        <ul className="space-y-3 text-sm">
                            {APP_CONFIG.FOOTER_LINKS.SUPPORT_LINKS.map((link, index) => (
                                <li key={index}>
                                    {link.isExternal ? (
                                        <a
                                            href={link.url || link.route}
                                            className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-normal"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.route}
                                            className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-normal"
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/[0.08] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs sm:text-sm text-slate-500">
                    <p>
                        &copy; {currentYear} <span className="text-slate-400 font-medium">{APP_CONFIG.APP_NAME}</span>.{" "}
                        {APP_CONFIG.COPYRIGHT_TEXT}
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>All Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;