import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom';
import { APP_CONFIG, ROUTES } from '../../utils/constants';
import { FaThLarge, FaVideo } from 'react-icons/fa';

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        navigate(ROUTES.HOME, { replace: true });
        await logout();
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20'
            : 'bg-[#0B1120] border-b border-white/[0.08]'
            }`}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16 gap-3'>
                    <Link
                        to={'/'}
                        className='flex items-center space-x-2 sm:space-x-3 group flex-shrink-0'
                    >
                        <div className='w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] group-hover:scale-105 transition-transform duration-300 flex-shrink-0'>
                            <FaVideo className='w-4 h-4 sm:w-5 sm:h-5' />
                        </div>
                        <h1 className='text-base sm:text-xl font-black text-white tracking-tight whitespace-nowrap'>
                            {APP_CONFIG.APP_NAME}
                        </h1>
                    </Link>

                    <nav className='flex items-center space-x-2 sm:space-x-4 flex-shrink-0'>
                        {isAuthenticated ? (
                            <>
                                <Link 
                                    to={ROUTES.DASHBOARD} 
                                    title="Dashboard"
                                    className='text-slate-300 hover:text-white font-medium transition-colors text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-white/[0.06]'
                                >
                                    <FaThLarge className='w-3.5 h-3.5 sm:hidden text-indigo-400' />
                                    <span className='hidden sm:inline'>Dashboard</span>
                                </Link>
                                <div 
                                    className='flex items-center space-x-2 px-2 sm:px-3 py-1.5 bg-white/[0.06] border border-white/[0.1] rounded-xl backdrop-blur-sm'
                                    title={user?.name}
                                >
                                    <div className='w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xs flex-shrink-0'>
                                        <span className='text-white text-xs font-bold'>
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className='text-slate-200 font-medium text-xs sm:text-sm hidden sm:inline truncate max-w-[110px]'>
                                        {user?.name}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className='px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded-xl hover:bg-rose-500/25 transition-all whitespace-nowrap cursor-pointer'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN} className='text-slate-300 hover:text-white font-medium transition-colors text-xs sm:text-sm px-2 py-1.5 whitespace-nowrap'>
                                    Sign In
                                </Link>
                                <Link
                                    to={ROUTES.REGISTER}
                                    className='px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:shadow-[0_0_30px_rgba(99,102,241,0.55)] transition-all whitespace-nowrap'
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header