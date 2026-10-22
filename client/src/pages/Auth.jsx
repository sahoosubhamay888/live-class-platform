import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/auth/AuthForm';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const mode = location.pathname === ROUTES.REGISTER ? 'register' : 'login';
    const redirectPath = location.state?.from?.pathname || ROUTES.DASHBOARD;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [localError, setLocalError] = useState('');
    const { login, register, loading, error, isAuthenticated, setError } = useAuth();

    // Redirect already authenticated users
    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectPath, { replace: true });
        }
    }, [isAuthenticated, navigate, redirectPath]);

    // Clear errors and sensitive fields when switching between login & register
    useEffect(() => {
        setLocalError('');
        if (setError) setError(null);
        setFormData(prev => ({
            ...prev,
            password: '',
            confirmPassword: ''
        }));
    }, [location.pathname, setError]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        if (localError) setLocalError('');
        if (error && setError) setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        if (setError) setError(null);

        const email = formData.email.trim();
        const password = formData.password;

        if (mode === 'login') {
            if (!email || !password) {
                setLocalError('Please fill in all fields');
                return;
            }

            const result = await login(email, password);
            if (result.success) {
                navigate(redirectPath, { replace: true });
            }
        } else {
            const name = formData.name.trim();
            const confirmPassword = formData.confirmPassword;

            if (!name || !email || !password || !confirmPassword) {
                setLocalError('Please fill in all fields');
                return;
            }

            if (password.length < 6) {
                setLocalError('Password must be at least 6 characters');
                return;
            }

            if (password !== confirmPassword) {
                setLocalError('Passwords do not match');
                return;
            }

            const result = await register(name, email, password);
            if (result.success) {
                navigate(redirectPath, { replace: true });
            }
        }
    };

    return (
        <AuthForm
            mode={mode}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            localError={localError}
        />
    );
};

export default Auth;
