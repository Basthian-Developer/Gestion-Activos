import { useState, useEffect } from 'react';
import type { Asignacion } from '@/features/asignacion/domain';
import { asignacionRepository } from '@/features/asignacion/dependencies';

export function useAsignaciones() {
    const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAsignaciones = async () => {
            try {
                const data = await asignacionRepository.getAll();
                setAsignaciones(data ?? []);
            } catch {
                setError('Error al cargar las asignaciones');
            } finally {
                setLoading(false);
            }
        };

        loadAsignaciones();
    }, []);

    return {
        asignaciones, loading, error
    };
}
