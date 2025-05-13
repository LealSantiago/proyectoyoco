// src/app/literature/page.tsx
'use client'

import React from 'react'
import SectionCard from '@/components/SectionCard'

const referencias = [
    {
        title: 'Bravo Osorio (2020) – Saber vivir allí como principio de vida Inga',
        href: 'https://doi.org/10.17227/folios.53-10183',
    },
    {
        title: 'Plantas Medicinales: Ecología y Economía',
        href: 'https://d1wqtxts1xzle7.cloudfront.net/34692560/plantas_medicinales._german_zuluaga-libre.pdf',
    },
    {
        title: 'Pautas para el conocimiento y conservación de plantas medicinales',
        href: 'https://d1wqtxts1xzle7.cloudfront.net/33959668/PautasparaelconocimientoconservacionyusosostenibledelasplantasmedicinalesnativasdeColombia-libre.pdf',
    },
    {
        title: 'Experiencia de gobierno propio de la Asociación de Cabildos Indígenas',
        href: 'https://repositorio.unal.edu.co/bitstream/handle/unal/85573/1010163527.2023.pdf',
    },
]

export default function LiteraturePage() {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-lg p-8 text-center">
                <h1 className="text-4xl font-bold">Revisión de la Literatura</h1>
                <p className="mt-2 max-w-2xl mx-auto">
                    Explora estos recursos clave para conocer más sobre el uso y conservación de <em>Paullinia yoco</em>.
                </p>
            </section>

            {/* References Grid */}
            <SectionCard title="Referencias y Recursos">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {referencias.map((ref, i) => (
                        <li key={i}>
                            <a
                                href={ref.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-[var(--color-card)] p-6 rounded-lg shadow hover:shadow-lg transition"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">
                                    {ref.title}
                                </h3>
                                <span className="text-sm text-[var(--color-secondary)] hover:underline">
                  Leer más &rarr;
                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </SectionCard>
        </div>
    )
}
