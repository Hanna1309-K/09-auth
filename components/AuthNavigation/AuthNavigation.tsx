'use client';

import Link from 'next/link';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function AuthNavigation() {
    const router = useRouter();

    const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            clearIsAuthenticated();
            router.push('/sign-in');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // ❗ НЕ авторизований користувач
    if (!isAuthenticated) {
        return (
            <>
                <li className={css.navigationItem}>
                    <Link href="/sign-in" className={css.navigationLink}>
                        Login
                    </Link>
                </li>

                <li className={css.navigationItem}>
                    <Link href="/sign-up" className={css.navigationLink}>
                        Sign up
                    </Link>
                </li>
            </>
        );
    }

    // ❗ Авторизований користувач
    return (
        <>
            <li className={css.navigationItem}>
                <Link href="/profile" className={css.navigationLink}>
                    Profile
                </Link>
            </li>

            <li className={css.navigationItem}>
                <p className={css.userEmail}>{user?.email}</p>
                <button
                    onClick={handleLogout}
                    className={css.logoutButton}
                >
                    Logout
                </button>
            </li>
        </>
    );
}