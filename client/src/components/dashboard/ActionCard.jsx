import { FaPlus, FaSpinner, FaUsers } from "react-icons/fa";
import { APP_CONFIG } from "../../utils/constants";

const ActionCard = ({ onCreateSession, onJoinSession, creating }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* ── Host Session Card ── */}
            <div className="group relative bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1] hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between">
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 30%, rgba(99,102,241,0.15), transparent 70%)' }}
                />

                <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl mb-6 mx-auto shadow-[0_0_25px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-300">
                        <FaPlus className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 text-center tracking-tight">
                        {APP_CONFIG.DASHBOARD_CONTENT.ACTION_CARDS.HOST.TITLE}
                    </h3>
                    <p className="text-slate-400 mb-6 text-center text-sm sm:text-base leading-relaxed">
                        {APP_CONFIG.DASHBOARD_CONTENT.ACTION_CARDS.HOST.DESCRIPTION}
                    </p>
                </div>

                <div className="relative z-10 mt-auto">
                    <button
                        onClick={onCreateSession}
                        disabled={creating}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base transition-all shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] cursor-pointer"
                    >
                        {creating ? (
                            <span className="flex items-center justify-center">
                                <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                {APP_CONFIG.DASHBOARD_CONTENT.ACTION_CARDS.HOST.BUTTON_LOADING}
                            </span>
                        ) : (
                            APP_CONFIG.DASHBOARD_CONTENT.ACTION_CARDS.HOST.BUTTON
                        )}
                    </button>
                </div>
            </div>

            {/* ── Join Session Card ── */}
            <div className="group relative bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-white/[0.1] hover:border-emerald-500/50 hover:-translate-y-1.5 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col justify-between">
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 50% 30%, rgba(16,185,129,0.15), transparent 70%)' }}
                />

                <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-300">
                        <FaUsers className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 text-center tracking-tight">
                        {APP_CONFIG.DASHBOARD_CONTENT.ACTION_CARDS.JOIN.TITLE}
                    </h3>
                    <p className="text-slate-400 mb-6 text-center text-sm sm:text-base leading-relaxed">
                        {APP_CONFIG.DASHBOARD_CONTENT.ACTION_CARDS.JOIN.DESCRIPTION}
                    </p>
                </div>

                <div className="relative z-10 mt-auto">
                    <button
                        onClick={onJoinSession}
                        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] cursor-pointer"
                    >
                        {APP_CONFIG.DASHBOARD_CONTENT.ACTION_CARDS.JOIN.BUTTON}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionCard;