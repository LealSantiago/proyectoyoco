// src/app/signup/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContent';
import SectionCard from '@/components/SectionCard';

export default function SignupPage() {
    const { user, signup } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');

    if (user) {
        router.replace('/mi-huerto');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirm) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            await signup(email, password);
            router.replace('/mi-huerto');
        } catch (err: any) {
            setError(err.message || 'Error en el registro');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <SectionCard title="Crear Cuenta">
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm" className="block text-sm font-medium mb-1">Confirma contraseña</label>
                        <input
                            id="confirm"
                            type="password"
                            required
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Registrarme
                    </button>
                </form>
            </SectionCard>
        </div>
    );
}