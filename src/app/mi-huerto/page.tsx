// src/app/mi-huerto/page.tsx
'use client';

import SectionCard from '@/components/SectionCard';
import React, { useState, useEffect } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import PlantViewer from '@/components/PlantViewer';
import { useAuth } from '@/context/AuthContent';
import { firestore } from '@/lib/firebase';
import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    orderBy,
} from 'firebase/firestore';

interface Garden {
    id: string;
    status: 'Verde' | 'Amarillo' | 'Rojo';
}

interface LogEntry {
    id: string;
    gardenId: string;
    action: string;
    notes: string;
    date: { seconds: number };
}

export default function MiHuertoPage() {
    const { user } = useAuth();
    const [gardens, setGardens] = useState<Garden[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const gardensRef = collection(firestore, 'gardens');
    const logsRef    = collection(firestore, 'logs');

    // Carga datos
    const loadData = async () => {
        setLoading(true);
        // Macetas
        const qG = query(gardensRef, where('userId', '==', user!.uid));
        const snapG = await getDocs(qG);
        setGardens(snapG.docs.map(d => ({ id: d.id, ...(d.data() as Garden) })));
        // Bitácora
        const qL = query(
            logsRef,
            where('userId', '==', user!.uid),
            orderBy('date', 'desc')
        );
        const snapL = await getDocs(qL);
        setLogs(snapL.docs.map(d => ({ id: d.id, ...(d.data() as LogEntry) })));
        setLoading(false);
    };

    useEffect(() => {
        if (!user) return;
        loadData();
    }, [user]);

    if (!user) {
        return (
            <ProtectedPage>
                <div className="flex items-center justify-center h-screen">
                    Verificando usuario...
                </div>
            </ProtectedPage>
        );
    }

    // Crea una nueva maceta con estado inicial “Verde”
    const handleAddGarden = async () => {
        await addDoc(gardensRef, { userId: user.uid, status: 'Verde' });
        await loadData();
    };

    // Registrar una actividad en la maceta
    const handleAddLog = async (gardenId: string) => {
        const action = prompt('¿Qué hiciste? (riego, poda, etc.)');
        if (!action) return;
        const notes = prompt('Notas adicionales') || '';
        await addDoc(logsRef, {
            userId: user.uid,
            gardenId,
            action,
            notes,
            date: new Date(),
        });
        await loadData();
    };

    // Eliminar maceta
    const handleDeleteGarden = async (gardenId: string) => {
        if (!confirm('¿Eliminar esta maceta?')) return;
        await deleteDoc(doc(firestore, 'gardens', gardenId));
        await loadData();
    };

    if (loading) {
        return (
            <ProtectedPage>
                <div className="flex items-center justify-center h-screen">
                    Cargando datos…
                </div>
            </ProtectedPage>
        );
    }

    // Escalas y colores según estado
    const factorMap: Record<Garden['status'], number> = {
        Verde: 1.2,
        Amarillo: 0.9,
        Rojo: 0.6,
    };
    const colorMap: Record<Garden['status'], number> = {
        Verde:   0x2ecc71,
        Amarillo:0xf1c40f,
        Rojo:    0xe74c3c,
    };

    return (
        <ProtectedPage>
            <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">

                {/* --- BOTÓN AGREGAR MACETA --- */}
                <div className="text-right">
                    <button
                        onClick={handleAddGarden}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Agregar maceta
                    </button>
                </div>

                {/* --- ESTADO DE MACETAS --- */}
                <SectionCard title="Estado de mis Macetas">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gardens.map((g, idx) => {
                            const scale = factorMap[g.status];
                            const color = colorMap[g.status];
                            return (
                                <div
                                    key={g.id}
                                    className="bg-white rounded-lg shadow p-6 flex flex-col items-center space-y-4"
                                >
                                    <h4 className="text-xl font-medium">Maceta {idx + 1}</h4>
                                    <p>
                                        Estado: <strong>{g.status}</strong>
                                    </p>

                                    {/* — Planta 3D junto a cada maceta — */}
                                    <div className="w-full h-48">
                                        <PlantViewer scale={scale} leafColor={color} />
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleAddLog(g.id)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded"
                                        >
                                            Registrar actividad
                                        </button>
                                        <button
                                            onClick={() => handleDeleteGarden(g.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded"
                                        >
                                            Eliminar maceta
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SectionCard>


                {/* --- BITÁCORA DE ACTIVIDADES --- */}
                <SectionCard title="Bitácora de Actividades">
                    <ul className="space-y-2">
                        {logs.map((log) => {
                            // Encuentra índice de la maceta
                            const idx = gardens.findIndex((g) => g.id === log.gardenId);
                            return (
                                <li
                                    key={log.id}
                                    className="bg-white rounded shadow p-4 flex justify-between"
                                >
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            Maceta {idx + 1} —{' '}
                                            {new Date(log.date.seconds * 1000).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>{log.action}</strong>
                                            {log.notes && <> — {log.notes}</>}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </SectionCard>
            </div>
        </ProtectedPage>
    );
}
