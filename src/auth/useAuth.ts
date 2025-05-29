import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { auth } from './firebase';
import toast from 'react-hot-toast';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to login');
            throw err;
        }
    };

    const signup = async (email: string, password: string, displayName: string) => {
        try {
            setError(null);
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, { displayName });
            return result.user;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign up');
            throw err;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
            toast.dismiss();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to logout');
            throw err;
        }
    };

    const resetPassword = async (email: string) => {
        try {
            setError(null);
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reset password');
            throw err;
        }
    };

    const getToken = async () => {
        if (!user) return null;
        try {
            return await user.getIdToken();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get token');
            return null;
        }
    };

    return {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        resetPassword,
        getToken
    };
} 