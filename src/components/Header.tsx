// src/components/Header.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { useAuth } from '@/context/AuthContent';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Proyecto Yoco</h1>
                <nav className="space-x-4">
                    <Link href="/">Inicio</Link>
                    <Link href="/literature">Literatura</Link>
                    <Link href="/cultivo">Cultivo</Link>
                    {user && <Link href="/mi-huerto">Mi Huerto</Link>}
                    {user && <Link href="/comunidad">Comunidad</Link>}
                    {!user && <Link href="/login">Ingresar</Link>}
                    {!user && <Link href="/register">Registrarse</Link>}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:underline"
                        >
                            Cerrar sesión
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}
