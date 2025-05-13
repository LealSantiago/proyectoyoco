// src/app/cultivo/page.tsx
'use client';

import React from 'react';
import SectionCard from '@/components/SectionCard';
import ImageGallery from '@/components/ImageGallery';

const guiaData = [
    {
        title: 'Configuración de Huertos',
        items: [
            'Contenedores: Macetas de 15–20 L o jardineras verticales; material ligero (fibra de coco, plástico reciclado).',
            'Sustrato: Mezcla 2:1 de tierra fértil y compost; pH 6–6.5.',
            'Ubicación: Balcones, terrazas o azoteas con 4–6 horas de sol diario.',
            'Riego: Sistema de riego por goteo casero o riego manual 2–3 veces por semana, ajustando según estación.',
        ],
        images: [
            { src: '/images/guia/Configuracion1.png', alt: 'Macetas en balcón' },
            { src: '/images/guia/Configuracion2.png', alt: 'Jardinera vertical' },
        ],
    },
    {
        title: 'Mantenimiento y Monitoreo',
        items: [
            'Poda: Recorte de brotes laterales cada mes para controlar altura y estimular ramificación.',
            'Protección: Mallas ligeras contra insectos; rotación de macetas para prevenir plagas.',
            'Registro: Usa la bitácora de actividades en tu perfil para anotar fechas de siembra, riego, floración y rendimiento.',
        ],
        images: [
            { src: '/images/guia/Mantenimiento1.png', alt: 'Persona podando planta' },
            { src: '/images/guia/Mantenimiento2.png', alt: 'Herramientas de poda' },
        ],
    },
    {
        title: 'Beneficios Urbanos',
        items: [
            'Ambientales: Mejora microclima local (reducción de temperatura hasta 2 °C); incremento de polinizadores.',
            'Sociales: Conecta con otros cultivadores, comparte semillas y experiencias.',
            'Educativos: Ofrece talleres de etnobotánica para colegios y grupos comunitarios.',
        ],
        images: [
            { src: '/images/guia/Beneficios1.png', alt: 'Huerto en azotea' },
            { src: '/images/guia/Beneficios2.png', alt: 'Taller en comunidad' },
        ],
    },
];

export default function CultivoPage() {
    return (
        <main className="px-4">
            <SectionCard title="Guía de Cultivo Urbano">
                <p className="text-gray-700 mb-4">
                    Consejos prácticos para montar y mantener tu huerto de{' '}
                    <em>Paullinia yoco</em> en ciudad.
                </p>
            </SectionCard>

            {guiaData.map((sec, i) => (
                <SectionCard key={i} title={sec.title}>
                    <div className="flex flex-col md:flex-row md:space-x-8">
                        {/* Lado izquierdo: texto */}
                        <ul className="list-disc list-inside space-y-2 text-gray-800 md:w-1/2">
                            {sec.items.map((line, idx) => (
                                <li key={idx}>{line}</li>
                            ))}
                        </ul>
                        {/* Lado derecho: galería */}
                        <div className="md:w-1/2">
                            <ImageGallery images={sec.images} />
                        </div>
                    </div>
                </SectionCard>
            ))}
        </main>
    );
}
