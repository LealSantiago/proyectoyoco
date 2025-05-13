// src/hooks/useGardenData.ts
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContent';

type Status = 'Verde' | 'Amarillo' | 'Rojo';

export function useGardenData() {
    const { user } = useAuth();
    const [status, setStatus] = useState<Status>('Verde');
    const [growthFactor, setGrowthFactor] = useState(1);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const userId = user.uid;
            const ref = collection(firestore, 'gardens');
            const q = query(ref, where('userId', '==', userId));
            const snap = await getDocs(q);
            if (snap.empty) return;
            const doc = snap.docs[0].data() as { status: Status };
            setStatus(doc.status);
            // Ajusta estos valores a tu gusto
            const factorMap: Record<Status, number> = {
                Verde: 1.2,
                Amarillo: 0.9,
                Rojo: 0.6,
            };
            setGrowthFactor(factorMap[doc.status] ?? 1);
        })();
    }, [user]);

    return { status, growthFactor };
}
