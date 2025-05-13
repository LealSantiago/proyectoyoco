// src/app/page.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContent'
import SectionCard from '@/components/SectionCard'

export default function HomePage() {
    const { user } = useAuth()

    return (
        <div className="space-y-16">

            {/* HERO */}
            <section className="bg-[var(--color-secondary)] text-white py-20 px-4 text-center rounded-lg shadow-lg mx-4 md:mx-0">
                <h1 className="text-5xl font-bold mb-4">Bienvenido a Proyecto Yoco</h1>
                <p className="text-xl max-w-2xl mx-auto mb-8">
                    Recupera y promueve el uso ancestral de la planta <em>Paullinia yoco</em> en tu propio huerto urbano.
                </p>

                {!user ? (
                    <div className="flex justify-center gap-4">
                        <Link href="/register">
                            <button className="bg-white text-[var(--color-secondary)] px-6 py-3 rounded-lg font-medium hover:opacity-90">
                                Crear cuenta
                            </button>
                        </Link>
                        <Link href="/login">
                            <button className="bg-transparent border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-[var(--color-secondary)] transition">
                                Iniciar sesión
                            </button>
                        </Link>
                    </div>
                ) : (
                    <p className="italic">¡Hola, {user.email}! Explora tu huerto o la comunidad.</p>
                )}
            </section>

            {/* FEATURES */}
            <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                <SectionCard title="Guía de Cultivo">
                    <p>Aprende paso a paso a preparar macetas, sustratos y riego para tu Yoco en espacios urbanos.</p>
                    <Link href="/cultivo">
                        <button className="mt-4">Ver Guía</button>
                    </Link>
                </SectionCard>

                <SectionCard title="Visor 3D">
                    <p>Descubre tu planta en 3D, visualiza su crecimiento según los datos de tu huerto.</p>
                    <Link href={user ? '/mi-huerto' : '/login'}>
                        <button className="mt-4">{user ? 'Ver Mi Huerto' : 'Inicia Sesión'}</button>
                    </Link>
                </SectionCard>

                <SectionCard title="Comunidad">
                    <p>Comparte avances, dudas y aprende de otros cultivadores urbanos.</p>
                    <Link href={user ? '/comunidad' : '/login'}>
                        <button className="mt-4">{user ? 'Entrar' : 'Inicia Sesión'}</button>
                    </Link>
                </SectionCard>
            </section>
        </div>
    )
}
