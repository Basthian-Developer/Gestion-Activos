import { useState, useEffect } from 'react';
import type { Reparacion } from '@/features/reparacion/domain';
import { reparacionRepository } from '@/features/reparacion/dependencies';

export function useReparaciones() {
    const [reparaciones, setReparaciones] = useState<Reparacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadReparaciones = async () => {
            try {
                const data = await reparacionRepository.getAll();
                setReparaciones(data ?? []);
            } catch {
                setError('Error al cargar las reparaciones');
            } finally {
                setLoading(false);
            }
        };

        loadReparaciones();
    }, []);

    return {
        reparaciones, loading, error
    };
}
