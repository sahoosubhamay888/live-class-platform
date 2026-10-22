import { Link } from 'react-router-dom';
import {
    FaBook,
    FaRocket,
    FaDesktop,
    FaUserCheck,
    FaVideo,
    FaMicrophone,
    FaWifi,
    FaArrowRight,
    FaCheckCircle,
} from 'react-icons/fa';
import { APP_CONFIG, ROUTES } from '../utils/constants';

const Documentation = () => {
    return (
        <div className="relative min-h-screen bg-[#0B1120] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/3 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/20 via-purple-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-4">
                        <FaBook className="w-4 h-4" />
                        <span>Platform Guide & Specs</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        Platform Documentation
                    </h1>
                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                        Everything you need to know about setting up, hosting, and participating in live interactive video sessions.
                    </p>
                </div>

                {/* Section 1: Getting Started */}
                <section className="mb-14 bg-slate-900/60 border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                            <FaRocket className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">1. Getting Started</h2>
                    </div>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        {APP_CONFIG.APP_NAME} is an online live education and collaboration environment engineered with high-definition real-time WebRTC audio and video streaming.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-5">
                            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-emerald-400 w-4 h-4" />
                                1. Create an Account
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                Sign up with your full name, email address, and a secure password. Your account grants access to hosting and session history.
                            </p>
                        </div>
                        <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-5">
                            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <FaCheckCircle className="text-emerald-400 w-4 h-4" />
                                2. Access the Dashboard
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                From your dashboard, you can instantly launch a new live session, join an existing meeting, or view past session records.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Hosting a Session */}
                <section className="mb-14 bg-slate-900/60 border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                            <FaVideo className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">2. Host Workflow</h2>
                    </div>

                    <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                        <p>
                            As a host, you have full control over the session lifecycle:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
                            <li><strong className="text-slate-200">Starting a Session:</strong> Click "Host a Session" from the Dashboard or Quick Links. A unique 9-character Room ID will be generated.</li>
                            <li><strong className="text-slate-200">Sharing Access:</strong> Use the "Copy Room ID" or "Copy Link" buttons to distribute the invite link to your attendees.</li>
                            <li><strong className="text-slate-200">In-Call Controls:</strong> You can toggle full-screen view and monitor the live participants counter in real time.</li>
                            <li><strong className="text-slate-200">Ending the Session:</strong> When your class concludes, click <span className="text-rose-400 font-medium">"End Session"</span>. This marks the room as concluded and disconnects all active streams.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 3: Participant Guide */}
                <section className="mb-14 bg-slate-900/60 border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-md">
                            <FaUserCheck className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">3. Joining as a Participant</h2>
                    </div>

                    <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                        <p>
                            Joining an active class is straightforward:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 text-slate-400 pl-2">
                            <li>Click on <Link to={ROUTES.JOIN} className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300">Join Session</Link> from the header, dashboard, or footer.</li>
                            <li>Enter the Room ID provided by your host (or click a shared link with the Room ID prefilled).</li>
                            <li>Allow your browser camera and microphone permissions when prompted.</li>
                            <li>You will immediately join the video grid and can see the host and fellow attendees.</li>
                        </ol>
                    </div>
                </section>

                {/* Section 4: Technical & System Requirements */}
                <section className="mb-16 bg-slate-900/60 border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                            <FaDesktop className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">4. System Requirements</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-5">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <FaDesktop className="text-cyan-400 w-4 h-4" />
                                Supported Browsers
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                Google Chrome (v80+), Microsoft Edge (v80+), Mozilla Firefox (v75+), Apple Safari (v14+), or Chromium-based browsers.
                            </p>
                        </div>

                        <div className="bg-slate-950/70 border border-white/[0.06] rounded-2xl p-5">
                            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                                <FaWifi className="text-indigo-400 w-4 h-4" />
                                Network Bandwidth
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                Minimum 2 Mbps for standard quality; 4-8 Mbps recommended for high-definition multi-person video streaming.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Quick Navigation Footer */}
                <div className="text-center pt-6 border-t border-white/[0.08]">
                    <Link
                        to={ROUTES.HELP}
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors group"
                    >
                        <span>Need further assistance? Check the Help Center</span>
                        <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Documentation;
