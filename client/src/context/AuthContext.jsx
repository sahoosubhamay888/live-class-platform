import { createContext, useContext, useEffect, useState } from "react";
import api from "../service/api";
import { API_ENDPOINTS } from "../utils/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //check if user is authenticated on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get(API_ENDPOINTS.AUTH.ME);
                setUser(response.data?.data?.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const register = async (name, email, password) => {
        try {
            setError(null);
            setLoading(true);
            const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
                name,
                email,
                password,
            });

            const userData = response.data?.data?.user;
            //update user state
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Registration failed";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
                email,
                password,
            });

            const userData = response.data?.data?.user;
            //update user state
            setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Login failed";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setError(null);
            setLoading(true);
            await api.post('/auth/logout');
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Logout failed";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setUser(null);
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        setError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

// useAuth hook
// custom hook to access auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export default AuthContext;