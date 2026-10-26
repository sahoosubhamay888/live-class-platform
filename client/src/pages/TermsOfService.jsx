import { FaFileContract, FaExclamationTriangle, FaBalanceScale, FaUserShield } from 'react-icons/fa';
import { APP_CONFIG } from '../utils/constants';

const TermsOfService = () => {
    return (
        <div className="relative min-h-screen bg-[#0B1120] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-semibold mb-4">
                        <FaFileContract className="w-4 h-4" />
                        <span>Legal Agreement</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Content Container */}
                <div className="bg-slate-900/60 border border-white/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 leading-relaxed text-slate-300">
                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            By creating an account, hosting, or joining a live class on {APP_CONFIG.APP_NAME}, you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, you may not use our services.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-slate-950/60 border border-white/[0.06] rounded-2xl p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <FaExclamationTriangle className="text-amber-400 w-5 h-5" />
                            2. Code of Conduct & Host Moderation
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 mb-3">
                            You agree to use {APP_CONFIG.APP_NAME} in a manner consistent with applicable laws and educational integrity. You explicitly agree NOT to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-400 pl-2 mb-4">
                            <li>Engage in harassment, verbal abuse, hate speech, or cyberbullying during live video calls.</li>
                            <li>Broadcast, display, or upload obscene, pornographic, or unlawful multimedia content.</li>
                            <li>Record or redistribute audio/video feeds of hosts or attendees without explicit written consent.</li>
                            <li>Attempt to breach or reverse engineer the authentication mechanisms, room security, or streaming tokens.</li>
                        </ul>
                        <div className="pt-3 border-t border-white/[0.08]">
                            <h3 className="text-xs sm:text-sm font-semibold text-amber-300/90 mb-1.5 uppercase tracking-wider">Host Moderation Authority</h3>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                Session hosts possess direct moderation authority over their active meetings. A host may immediately eject any participant who violates room rules or disrupts the class. Session ejection disconnects the participant's active stream but does not automatically delete their platform account; however, persistent or egregious violations may trigger platform-wide account suspension under Section 6.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            3. User Accounts & Room Passcodes
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            You are responsible for maintaining the confidentiality of your login credentials and any room access links you generate. You accept responsibility for all activities that take place under your account.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            4. Intellectual Property
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            Hosts and educators retain full intellectual property rights to the instructional content, presentations, and teaching materials shared within their live sessions. {APP_CONFIG.APP_NAME} claims no ownership over user-generated stream content.
                        </p>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <FaBalanceScale className="text-indigo-400 w-5 h-5" />
                            5. Disclaimer of Warranties
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            {APP_CONFIG.APP_NAME} is provided on an "as is" and "as available" basis. While we strive for high uptime and video stability, we do not warrant that video streaming will be error-free or uninterrupted, as real-time quality depends on end-user hardware, ISP bandwidth, and WebRTC network conditions.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400" />
                            6. Account Termination
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            We reserve the right to suspend or terminate any user account immediately and without prior notice if they violate these Terms of Service or pose a security risk to other participants.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
