'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './SignUpPage.module.css';

import { register } from '@/lib/api/clientApi';
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await register({ email, password });

            setUser(user);
            router.push('/profile');
        } catch {
            setError('Registration failed');
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>

            <form className={css.form} onSubmit={onSubmit}>
                <div className={css.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        className={css.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={css.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        className={css.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className={css.submitButton} type="submit">
                    Register
                </button>

                <p className={css.error}>{error}</p>
            </form>
        </main>
    );
}