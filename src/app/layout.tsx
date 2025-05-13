// src/app/layout.tsx
'use client';

import './globals.css';
import Header from '../components/Header';
import { AuthProvider } from '@/context/AuthContent';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <body>
        {/* ¡Envolvemos TODO con AuthProvider para que useAuth() funcione! */}
        <AuthProvider>
            <Header />
            <main className="fade-in">{children}</main>
        </AuthProvider>
        </body>
        </html>
    );
}
