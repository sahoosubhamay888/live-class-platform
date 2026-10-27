import { useState } from 'react';
import {
    FaQuestionCircle,
    FaVideo,
    FaMicrophoneSlash,
    FaWifi,
    FaShieldAlt,
    FaEnvelope,
    FaChevronDown,
    FaArrowRight,
    FaSearch
} from 'react-icons/fa';
import { APP_CONFIG, ROUTES } from '../utils/constants';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaq, setOpenFaq] = useState(null);

    const categories = [
        {
            icon: FaVideo,
            title: 'Audio & Video Issues',
            description: 'Fix camera, microphone, and device permission problems in your browser.',
            color: 'from-blue-500 to-indigo-600',
        },
        {
            icon: FaWifi,
            title: 'Connection & Quality',
            description: 'Resolve lag, buffering, or sudden call disconnections.',
            color: 'from-indigo-500 to-purple-600',
        },
        {
            icon: FaShieldAlt,
            title: 'Rooms & Access',
            description: 'Learn how Room IDs, hosting permissions, and join links work.',
            color: 'from-purple-500 to-pink-600',
        },
    ];

    const faqs = [
        {
            category: 'Audio & Video Issues',
            question: 'Why is my camera or microphone not working in the call?',
            answer: 'Modern browsers require explicit permission to access your webcam and mic. Check the lock icon or camera icon in your browser URL address bar and ensure "Camera" and "Microphone" permissions are set to "Allow". After granting permission, refresh the session page.'
        },
        {
            category: 'Audio & Video Issues',
            question: 'How do I prevent echo or audio feedback?',
            answer: 'Audio feedback occurs when your speakers transmit incoming sound directly back into your microphone. We recommend wearing headphones and keeping your microphone muted whenever you are not speaking.'
        },
        {
            category: 'Rooms & Access',
            question: 'Do students or attendees need an account to join a session?',
            answer: 'Currently, all hosts and participants must be signed in with a free account to ensure session accountability, participant identification, and spam prevention.'
        },
        {
            category: 'Rooms & Access',
            question: 'How do I invite participants to my live class?',
            answer: 'When hosting a session, copy the 9-character Room ID or click the "Copy" button next to the Shareable Link in your Session Information card. Share this link directly with your students.'
        },
        {
            category: 'Connection & Quality',
            question: 'What are the minimum internet speed requirements?',
            answer: 'For a stable HD video stream, we recommend at least 3-5 Mbps upload and download speed. If you experience stutters, try moving closer to your Wi-Fi router or switching to a wired connection.'
        },
        {
            category: 'Rooms & Access',
            question: 'Can I rejoin a session if I accidentally close the tab?',
            answer: 'Yes! Hosts and participants can rejoin any active session at any time from their Dashboard under "Your Sessions" by clicking the "Rejoin" button.'
        },
        {
            category: 'Rooms & Access',
            question: 'Can hosts remove or block disruptive participants during a session?',
            answer: 'Yes. Session hosts can view the live participants panel, click the remove button next to any participant\'s name, and confirm via the top safety dialog. The attendee is immediately disconnected from the video room and redirected to their dashboard with a notification.'
        },
        {
            category: 'Rooms & Access',
            question: 'What does Lock Session do, and how can hosts unlock it?',
            answer: 'When a host locks a session, no new participants can enter using the Room ID or join link. Anyone trying to join will see a red error alert stating that the session is locked. Participants who are already inside the meeting are not disconnected. The host can toggle \"Unlock Session\" at any time to resume admitting attendees.'
        },
        {
            category: 'Rooms & Access',
            question: 'What happens if I get removed or blocked from a session?',
            answer: 'If a host removes you from a meeting, your audio/video stream will end and you will receive a notification before returning to your dashboard. If you were removed, you can re-enter using the Room ID if the host permits. However, if you were blocked, you are permanently barred by the server from rejoining that session.'
        },
        {
            category: 'Audio & Video Issues',
            question: 'Can I test my camera and microphone before joining a live call?',
            answer: 'Yes! When entering any session, EduSync opens a Pre-Join Lobby. You can check your camera preview, toggle your microphone and video streams on or off, and only connect to the live room when you are ready.'
        },
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const filteredFaqs = faqs.filter(
        faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-[#0B1120] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold mb-4">
                        <FaQuestionCircle className="w-4 h-4" />
                        <span>Support & Resources</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
                        Find instant solutions to common questions, technical troubleshooting, and live session setup guides.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-xl mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions, camera issues, room IDs..."
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-white/[0.1] rounded-2xl text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all shadow-xl"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-slate-900/70 border border-white/[0.08] hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white mb-4 shadow-md`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1.5">{cat.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{cat.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* FAQs Accordion */}
                <div className="mb-16">
                    <h2 className="text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        Frequently Asked Questions
                    </h2>

                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-white/[0.06]">
                            <p className="text-slate-400">No matching questions found. Try searching with different keywords.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredFaqs.map((faq, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div
                                        key={index}
                                        className="bg-slate-900/70 border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-200"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(index)}
                                            className="w-full text-left p-5 flex items-center justify-between text-white font-semibold hover:text-indigo-400 transition-colors gap-4"
                                        >
                                            <span className="text-sm sm:text-base">{faq.question}</span>
                                            <FaChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/[0.05]">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-3xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Still need help?</h3>
                        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                            Our team is here to assist with any technical or account queries. Drop us an email anytime.
                        </p>
                    </div>
                    <a
                        href={APP_CONFIG.SOCIAL_LINKS.EMAIL}
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
                    >
                        <FaEnvelope className="w-4 h-4" />
                        <span>Email Support</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
