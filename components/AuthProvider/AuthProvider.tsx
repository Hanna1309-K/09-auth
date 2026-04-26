'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const setUser = useAuthStore((s) => s.setUser);
    const logout = useAuthStore((s) => s.logout);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = await getMe();
                setUser(user);
            } catch {
                logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [setUser, logout]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return <>{children}</>;
}