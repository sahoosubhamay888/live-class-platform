import {
    FaArrowRight,
    FaExclamationCircle,
    FaHome,
    FaInfoCircle,
    FaSpinner,
    FaUsers,
} from "react-icons/fa";
import { APP_CONFIG } from "../../utils/constants";

const JoinForm = ({ roomId, error, loading, onChange, onSubmit }) => {
    return (
        <div className="max-w-xl mx-auto bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/[0.1] relative overflow-hidden">
            {/* Top ambient blur inside card */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-36 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8 relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-5">
                    <FaUsers className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                    {APP_CONFIG.SESSION_CONTENT.JOIN_FORM.HEADING}
                </h1>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                    {APP_CONFIG.SESSION_CONTENT.JOIN_FORM.DESCRIPTION}
                </p>
            </div>

            {error && (
                <div className="mb-6 bg-rose-500/10 border border-rose-500/30 text-rose-300 p-4 rounded-xl relative z-10">
                    <div className="flex items-center">
                        <FaExclamationCircle className="w-5 h-5 mr-3 flex-shrink-0 text-rose-400" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6 relative z-10">
                <div>
                    <label
                        htmlFor="roomId"
                        className="block text-sm font-semibold text-slate-300 mb-3"
                    >
                        {APP_CONFIG.SESSION_CONTENT.JOIN_FORM.ROOM_ID_LABEL}
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FaHome className="h-5 w-5 text-slate-400" />
                        </div>

                        <input
                            id="roomId"
                            type="text"
                            value={roomId}
                            onChange={onChange}
                            maxLength={12}
                            placeholder={
                                APP_CONFIG.SESSION_CONTENT.JOIN_FORM.ROOM_ID_PLACEHOLDER
                            }
                            className="block w-full pl-12 pr-4 py-4 bg-slate-950/80 border-2 border-white/[0.15] rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-center text-xl font-mono tracking-widest uppercase text-white placeholder-slate-500 transition-all shadow-inner"
                        />
                    </div>

                    <p className="mt-3 text-xs text-slate-400 text-center font-light">
                        <FaInfoCircle className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                        {APP_CONFIG.SESSION_CONTENT.JOIN_FORM.ROOM_ID_HELP}
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] text-lg font-bold hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            {APP_CONFIG.SESSION_CONTENT.JOIN_FORM.BUTTON_LOADING}
                        </>
                    ) : (
                        <>
                            <FaArrowRight className="w-5 h-5 mr-2" />
                            {APP_CONFIG.SESSION_CONTENT.JOIN_FORM.BUTTON}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default JoinForm;