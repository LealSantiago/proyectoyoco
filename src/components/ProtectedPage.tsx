// src/components/ProtectedPage.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContent';
import { useRouter } from 'next/navigation';

interface ProtectedPageProps {
    children: ReactNode;
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                Cargando…
            </div>
        );
    }

    return <>{children}</>;
}
