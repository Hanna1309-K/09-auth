'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';

import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';

export default function EditProfilePage() {
    const router = useRouter();
    const { user, setUser } = useAuthStore();

    const [username, setUsername] = useState('');
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current && user?.username) {
            setUsername(user.username);
            initialized.current = true;
        }
    }, [user]);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedUser = await updateMe({ username });

            setUser(updatedUser);

            router.push('/profile');
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const handleCancel = () => {
        router.push('/profile');
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user.avatar}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form onSubmit={handleSave} className={css.profileInfo}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={css.input}
                        />
                    </div>

                    <p>Email: {user.email}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className={css.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}