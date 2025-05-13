// src/app/comunidad/page.tsx
'use client';
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { useAuth } from '@/context/AuthContent';
import SectionCard from '@/components/SectionCard';
import { firestore } from '@/lib/firebase';
import {
    collection,
    query,
    orderBy,
    getDocs,
    addDoc
} from 'firebase/firestore';

export default function ComunidadPage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');

    // Primero aseguramos que sea client
    if (!user) {
        return (
            <ProtectedPage>
                <div className="flex items-center justify-center h-screen">
                    Verificando usuario…
                </div>
            </ProtectedPage>
        );
    }

    // Carga inicial de posts
    useEffect(() => {
        const loadPosts = async () => {
            const postsRef = collection(firestore, 'posts') as any;
            const q = query(postsRef, orderBy('createdAt', 'desc'));
            const snap = await getDocs(q);
            setPosts(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
        };
        loadPosts();
    }, [user]);

    // Publicar un nuevo post
    const handlePost = async () => {
        if (!newMessage.trim()) return;
        const postsRef = collection(firestore, 'posts') as any;
        await addDoc(postsRef, {
            userId: user.uid,
            message: newMessage,
            createdAt: new Date()
        });
        setNewMessage('');
        // recarga
        const snap = await getDocs(query(postsRef, orderBy('createdAt', 'desc')));
        setPosts(snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
    };

    return (
        <ProtectedPage>
            <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
                <h2 className="text-3xl font-bold">Comunidad</h2>

                <SectionCard title="Comparte en la Comunidad">
          <textarea
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              rows={3}
              className="w-full border rounded p-2"
              placeholder="Comparte tus avances o dudas..."
          />
                    <button
                        onClick={handlePost}
                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Publicar
                    </button>
                </SectionCard>

                <SectionCard title="Últimas Publicaciones">
                    <ul className="space-y-4">
                        {posts.map(post => (
                            <li key={post.id} className="border rounded p-4">
                                <p>{post.message}</p>
                                <p className="text-xs text-gray-500">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </SectionCard>
            </div>
        </ProtectedPage>
    );
}
