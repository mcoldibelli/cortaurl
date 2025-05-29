import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './useAuth';

interface AuthContextType {
    user: ReturnType<typeof useAuth>['user'];
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<any>;
    signup: (email: string, password: string, displayName: string) => Promise<any>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
} 