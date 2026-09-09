import { useState, useEffect } from 'react';
import type { Garantia } from '@/features/garantia/domain';
import { garantiaRepository } from '@/features/garantia/dependencies';

export function useGarantias() {
    const [garantias, setGarantias] = useState<Garantia[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGarantias = async () => {
            try {
                const data = await garantiaRepository.getAll();
                setGarantias(data ?? []);
            } catch {
                setError('Error al cargar las garantías');
            } finally {
                setLoading(false);
            }
        };

        loadGarantias();
    }, []);

    return {
        garantias, loading, error
    };
}
