import { useState, useEffect } from 'react';
import type { Activo } from '@/features/activo/domain';
import { activoRepository } from '@/features/activo/dependencies';

export function useActivos() {
    const [activos, setActivos] = useState<Activo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadActivos = async () => {
            try {
                const data = await activoRepository.getAll();
                setActivos(data ?? []);
            } catch (err) {
                setError('Error al cargar los activos');
            } finally {
                setLoading(false);
            }
        };

        loadActivos();
    }, []);

    return {
        activos, loading, error
    }
}