// src/components/SectionCard.tsx
'use client';

import React from 'react';

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;  // Nueva prop para estilos extra
}

export default function SectionCard({
                                        title,
                                        children,
                                        className = '',
                                    }: SectionCardProps) {
    return (
        <>
            <section className={`card ${className}`}>
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <div className="w-full">
                    {children}
                </div>
            </section>
            <hr className="separator" />
        </>
    );
}
