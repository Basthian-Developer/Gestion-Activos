import { useState, useEffect } from 'react';
import type { MovimientoUbicacion } from '@/features/movimiento_ubicacion/domain';
import { movimientoUbicacionRepository } from '@/features/movimiento_ubicacion/dependencies';

export function useMovimientosUbicacion() {
    const [movimientosUbicacion, setMovimientosUbicacion] = useState<MovimientoUbicacion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMovimientosUbicacion = async () => {
            try {
                const data = await movimientoUbicacionRepository.getAll();
                setMovimientosUbicacion(data ?? []);
            } catch {
                setError('Error al cargar los movimientos de ubicación');
            } finally {
                setLoading(false);
            }
        };

        loadMovimientosUbicacion();
    }, []);

    return {
        movimientosUbicacion, loading, error
    };
}
