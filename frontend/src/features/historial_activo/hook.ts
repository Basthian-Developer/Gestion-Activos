import { useState, useEffect } from 'react';
import type { HistorialActivo } from '@/features/historial_activo/domain';
import { historialActivoRepository } from '@/features/historial_activo/dependencies';

export function useHistorialesActivos() {
    const [historialesActivos, setHistorialesActivos] = useState<HistorialActivo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHistorialesActivos = async () => {
            try {
                const data = await historialActivoRepository.getAll();
                setHistorialesActivos(data ?? []);
            } catch {
                setError('Error al cargar los historiales de activos');
            } finally {
                setLoading(false);
            }
        };

        loadHistorialesActivos();
    }, []);

    return {
        historialesActivos, loading, error
    };
}
