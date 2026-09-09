import { useState, useEffect } from 'react';
import type { Estado } from '@/features/estado/domain';
import { estadoRepository } from '@/features/estado/dependencies';

export function useEstados() {
    const [estados, setEstados] = useState<Estado[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEstados = async () => {
            try {
                const data = await estadoRepository.getAll();
                setEstados(data ?? []);
            } catch {
                setError('Error al cargar los estados');
            } finally {
                setLoading(false);
            }
        };

        loadEstados();
    }, []);

    return {
        estados, loading, error
    };
}
