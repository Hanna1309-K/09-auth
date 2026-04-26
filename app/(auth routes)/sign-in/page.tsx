'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './SignInPage.module.css';

import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignInPage() {
    const router = useRouter();
    const setUser = useAuthStore((s) => s.setUser);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const user = await login({ email, password });

            setUser(user);
            router.push('/profile');

            console.log('LOGIN RESPONSE:', user); // 👈 ОЦЕ В КІНЦІ
        } catch {
            setError('Invalid credentials');
        }
    };

    return (
        <main className={css.mainContent}>
            <form className={css.form} onSubmit={onSubmit}>
                <h1 className={css.formTitle}>Sign in</h1>

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
                    Log in
                </button>

                <p className={css.error}>{error}</p>
            </form>
        </main>
    );
}