import { FaShieldAlt, FaLock, FaUserSecret, FaVideo, FaServer } from 'react-icons/fa';
import { APP_CONFIG } from '../utils/constants';

const PrivacyPolicy = () => {
    return (
        <div className="relative min-h-screen bg-[#0B1120] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-4">
                        <FaShieldAlt className="w-4 h-4" />
                        <span>Security & Trust</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        Privacy Policy
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
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            1. Introduction
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            At {APP_CONFIG.APP_NAME}, we take your privacy and personal data seriously. This Privacy Policy details how we collect, use, and safeguard information when you access our live video education platform.
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            2. Information We Collect
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-400 pl-2">
                            <li><strong className="text-slate-200">Account Credentials:</strong> When you register, we store your full name, email address, and a securely salted & hashed password.</li>
                            <li><strong className="text-slate-200">Session Metadata:</strong> Generated Room IDs, host identifiers, meeting start/end timestamps, and participant attendance lists for session history display.</li>
                            <li><strong className="text-slate-200">Technical Logs:</strong> IP address and browser type for security monitoring and fraud prevention.</li>
                        </ul>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-slate-950/60 border border-white/[0.06] rounded-2xl p-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <FaVideo className="text-blue-400 w-5 h-5" />
                            3. Camera, Audio & Media Privacy
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 mb-3">
                            <strong className="text-white">We do NOT record or store your live audio or video streams.</strong>
                        </p>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            Video and audio streams are rendered in real time utilizing WebRTC media protocols. Microphone and webcam access are used exclusively during active video sessions and only when you explicitly grant browser permission. Once a session concludes, media feeds are immediately terminated.
                        </p>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            4. Third-Party Service Providers
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400 mb-3">
                            We collaborate with trusted technology infrastructure providers to deliver reliable services:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-400 pl-2">
                            <li><strong className="text-slate-200">ZEGOCLOUD:</strong> Provides real-time network infrastructure for ultra-low latency WebRTC audio/video transmission.</li>
                            <li><strong className="text-slate-200">MongoDB Atlas:</strong> Encrypted cloud database utilized for persistent storage of user profiles and session metadata.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            5. Data Security
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            We employ modern industry best practices including HTTPS/TLS encryption for all client-server communications, JSON Web Tokens (JWT) stored in secure HTTP-only cookies, and bcrypt hashing for stored passwords.
                        </p>
                    </section>

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-400" />
                            6. Contact & Data Deletion
                        </h2>
                        <p className="text-sm sm:text-base text-slate-400">
                            If you have questions regarding this Privacy Policy or wish to request the deletion of your account and related metadata, please reach out to us at{' '}
                            <a href={APP_CONFIG.SOCIAL_LINKS.EMAIL} className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300">
                                support@liveclasses.com
                            </a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
