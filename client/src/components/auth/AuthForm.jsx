import { useState } from "react";
import {
    FaArrowLeft,
    FaEnvelope,
    FaExclamationCircle,
    FaEye,
    FaEyeSlash,
    FaLock,
    FaShieldAlt,
    FaSpinner,
    FaUser,
    FaUserPlus,
    FaVideo,
} from "react-icons/fa";
import { APP_CONFIG, ROUTES } from "../../utils/constants";
import { Link } from "react-router-dom";

const AuthForm = ({
    mode,
    formData,
    onChange,
    onSubmit,
    loading,
    error,
    localError,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isLogin = mode === "login";
    const displayError = localError || error;

    return (
        <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#0B1120] overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-blue-500/20 via-indigo-600/15 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-24 -right-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-blob" />
                <div className="absolute -bottom-24 -left-32 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
            </div>

            <div
                className="absolute inset-0 opacity-[0.18] pointer-events-none -z-10"
                style={{
                    backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '28px 28px'
                }}
            />

            <div className="max-w-md w-full relative z-10">
                <div className="mb-6">
                    <Link
                        to={ROUTES.HOME}
                        className="inline-flex items-center text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 group"
                    >
                        <FaArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform duration-200 text-indigo-400" />
                        Back to Home
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-xl mb-4 transition-transform duration-300 hover:scale-105 ${isLogin
                                ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                                : "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600 shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                            }`}
                    >
                        {isLogin ? (
                            <FaVideo className="w-8 h-8 text-white" />
                        ) : (
                            <FaUserPlus className="w-8 h-8 text-white" />
                        )}
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                        {isLogin ? APP_CONFIG.APP_NAME : `Join ${APP_CONFIG.APP_NAME}`}
                    </h1>

                    <p className="text-slate-400 text-sm sm:text-base font-normal tracking-wide">
                        {isLogin
                            ? APP_CONFIG.APP_TAGLINE
                            : "Start your learning journey today"}
                    </p>
                </div>

                <div className="relative bg-[#0F172A] rounded-3xl p-8 sm:p-10 border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div
                        className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl ${isLogin
                                ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                                : "bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"
                            }`}
                    />

                    <div className="mb-6 text-center">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {isLogin
                                ? APP_CONFIG.AUTH_CONTENT.LOGIN.HEADING
                                : APP_CONFIG.AUTH_CONTENT.REGISTER.HEADING}
                        </h2>

                        <p className="mt-2 text-sm text-slate-300 font-normal">
                            {isLogin
                                ? APP_CONFIG.AUTH_CONTENT.LOGIN.DESCRIPTION
                                : APP_CONFIG.AUTH_CONTENT.REGISTER.DESCRIPTION}
                        </p>
                    </div>

                    <form
                        className={isLogin ? "space-y-5" : "space-y-4"}
                        onSubmit={onSubmit}
                    >
                        {displayError && (
                            <div className="bg-rose-500/15 border border-rose-500/40 text-rose-200 p-4 rounded-xl flex items-start shadow-md animate-fade-up">
                                <FaExclamationCircle className="w-5 h-5 mr-3 mt-0.5 text-rose-400 flex-shrink-0" />
                                <span className="text-sm font-medium leading-relaxed">{displayError}</span>
                            </div>
                        )}

                        {!isLogin && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-white mb-2 tracking-normal"
                                >
                                    Full Name
                                </label>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <FaUser className="h-4 w-4 text-slate-300 group-focus-within:text-purple-400 transition-colors" />
                                    </div>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={formData.name || ""}
                                        onChange={onChange}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 text-base font-normal focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-white mb-2 tracking-normal"
                            >
                                Email Address
                            </label>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <FaEnvelope className={`h-4 w-4 text-slate-300 transition-colors ${isLogin ? "group-focus-within:text-indigo-400" : "group-focus-within:text-purple-400"}`} />
                                </div>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email || ""}
                                    onChange={onChange}
                                    className={`block w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 text-base font-normal focus:outline-none focus:ring-2 transition-colors ${isLogin
                                            ? "focus:border-indigo-400 focus:ring-indigo-500/40"
                                            : "focus:border-purple-400 focus:ring-purple-500/40"
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-white mb-2 tracking-normal"
                            >
                                Password
                            </label>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <FaLock className={`h-4 w-4 text-slate-300 transition-colors ${isLogin ? "group-focus-within:text-indigo-400" : "group-focus-within:text-purple-400"}`} />
                                </div>

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                                    required
                                    value={formData.password || ""}
                                    onChange={onChange}
                                    className={`block w-full pl-11 pr-11 py-3.5 bg-slate-950 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 text-base font-normal focus:outline-none focus:ring-2 transition-colors ${isLogin
                                            ? "focus:border-indigo-400 focus:ring-indigo-500/40"
                                            : "focus:border-purple-400 focus:ring-purple-500/40"
                                        }`}
                                    placeholder={isLogin ? 'Enter your password' : 'Minimum 6 characters'}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none transition-colors cursor-pointer"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-4 w-4" />
                                    ) : (
                                        <FaEye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {!isLogin && (
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-white mb-2 tracking-normal"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <FaShieldAlt className="h-4 w-4 text-slate-300 group-focus-within:text-purple-400 transition-colors" />
                                    </div>

                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        autoComplete='new-password'
                                        required
                                        value={formData.confirmPassword || ""}
                                        onChange={onChange}
                                        className="block w-full pl-11 pr-11 py-3.5 bg-slate-950 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 text-base font-normal focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition-colors"
                                        placeholder='Re-enter your password'
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none transition-colors cursor-pointer"
                                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                        title={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                    >
                                        {showConfirmPassword ? (
                                            <FaEyeSlash className="h-4 w-4" />
                                        ) : (
                                            <FaEye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center items-center py-3.5 px-6 rounded-xl font-bold tracking-wide text-white text-sm sm:text-base shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer ${isLogin
                                    ? "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] focus:ring-2 focus:ring-indigo-500/50"
                                    : "bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 hover:shadow-[0_0_35px_rgba(236,72,153,0.55)] focus:ring-2 focus:ring-pink-500/50 mt-6"
                                }`}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    {isLogin ? 'Signing in...' : 'Creating account...'}
                                </>
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-6 border-t border-white/[0.08]">
                        <p className="text-sm text-slate-400 font-normal">
                            {isLogin ? (
                                <>
                                    Don't have an account?{' '}
                                    <Link
                                        to={ROUTES.REGISTER}
                                        className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors ml-1 underline-offset-4 hover:underline"
                                    >
                                        Create one now
                                    </Link>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <Link
                                        to={ROUTES.LOGIN}
                                        className="font-semibold text-purple-400 hover:text-purple-300 transition-colors ml-1 underline-offset-4 hover:underline"
                                    >
                                        Sign in here
                                    </Link>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
