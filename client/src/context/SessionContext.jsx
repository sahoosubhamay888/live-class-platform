import { createContext, useCallback, useContext, useState } from "react";
import api from "../service/api";
import { API_ENDPOINTS } from "../utils/constants";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [currentSession, setCurrentSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Create a new session 
    const createSession = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await api.post(API_ENDPOINTS.SESSION.CREATE);
            const session = response.data.data.session;
            setCurrentSession(session);
            return { success: true, session };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to create new session';
            setError(errorMessage);
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }, []);

    // Join session
    const joinSession = useCallback(async (roomId) => {
        try {
            setError(null);
            setLoading(true);
            const response = await api.post(API_ENDPOINTS.SESSION.JOIN, { roomId });
            const session = response.data.data.session;
            setCurrentSession(session);
            return { success: true, session };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to join the session';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, []);

    // Get session
    const getSession = useCallback(async (roomId, silent = false) => {
        try {
            if (!silent) {
                setError(null);
                setLoading(true);
            }
            const response = await api.get(`${API_ENDPOINTS.SESSION.GET}/${roomId}`);
            const session = response.data.data.session;
            setCurrentSession(session);
            return { success: true, session };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to get the session';
            if (!silent) setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            if (!silent) setLoading(false);
        }
    }, []);

    // Leave session
    const leaveSession = useCallback(async (roomId) => {
        try {
            setError(null);
            setLoading(true);
            const targetRoomId = roomId || currentSession?.roomId;
            if (targetRoomId) {
                await api.post(API_ENDPOINTS.SESSION.LEAVE, { roomId: targetRoomId });
            }
            setCurrentSession(null);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to leave the session';
            setError(errorMessage);
            setCurrentSession(null);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    }, [currentSession?.roomId]);

    //list sessions
    const listSessions = useCallback(async (status = 'all') => {
        try {
            setError(null);
            setLoading(true);
            const response = await api.get('/session/list', {
                params: { status }
            });
            const sessions = response.data.data.session;
            return { success: true, sessions };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch sessions';
            setError(errorMessage);
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }, [])

    // Kick / remove participant (Host only)
    const kickParticipant = useCallback(async (roomId, targetUserId) => {
        try {
            setError(null);
            const response = await api.post(API_ENDPOINTS.SESSION.KICK, {
                roomId,
                targetUserId,
            });
            const updatedSession = response.data?.data?.session;
            if (updatedSession) {
                setCurrentSession((prev) => prev ? { ...prev, ...updatedSession } : updatedSession);
            }
            return { success: true, session: updatedSession };
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to remove participant';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    }, []);

    const clearSession = useCallback(() => {
        setCurrentSession(null);
        setError(null);
    }, [])

    const value = {
        currentSession,
        loading,
        error,
        createSession,
        joinSession,
        getSession,
        leaveSession,
        listSessions,
        kickParticipant,
        clearSession,
        setError
    };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
};

// useSession hook
// custom hook to access session context
export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within an Sessionprovider')
    }
    return context;
}

export default SessionContext;