'use client';

import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';

export default function ProfilePage() {
    const user = useAuthStore((s) => s.user);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (!isAuthenticated) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user data</p>;
    }

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>

                <div className={css.header}>
                    <h1 className={css.formTitle}>Profile Page</h1>

                    <Link href="/profile/edit" className={css.editProfileButton}>
                        Edit Profile
                    </Link>
                </div>

                <div className={css.avatarWrapper}>
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>

                <div className={css.profileInfo}>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>

            </div>
        </main>
    );
}