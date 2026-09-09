import { useState, useEffect } from 'react';
import type { Rol } from '@/features/rol/domain';
import { rolRepository } from '@/features/rol/dependencies';

export function useRoles() {
    const [roles, setRoles] = useState<Rol[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await rolRepository.getAll();
                setRoles(data ?? []);
            } catch {
                setError('Error al cargar los roles');
            } finally {
                setLoading(false);
            }
        };

        loadRoles();
    }, []);

    return {
        roles, loading, error
    };
}
