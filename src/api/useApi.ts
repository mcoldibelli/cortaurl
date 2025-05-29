import { useMemo } from 'react';
import { useAuthContext } from '../auth/AuthContext';
import { createApiClient } from './apiClient';

export function useApi() {
    const { getToken } = useAuthContext();
    
    return useMemo(() => createApiClient(getToken), [getToken]);
} 