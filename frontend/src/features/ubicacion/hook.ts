import { useState, useEffect } from 'react';
import type { Ubicacion } from '@/features/ubicacion/domain';
import { ubicacionRepository } from '@/features/ubicacion/dependencies';

export function useUbicaciones() {
    const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUbicaciones = async () => {
            try {
                const data = await ubicacionRepository.getAll();
                setUbicaciones(data ?? []);
            } catch {
                setError('Error al cargar las ubicaciones');
            } finally {
                setLoading(false);
            }
        };

        loadUbicaciones();
    }, []);

    return {
        ubicaciones, loading, error
    };
}
