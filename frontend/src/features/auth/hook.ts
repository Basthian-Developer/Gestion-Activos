import { useState, useEffect } from 'react';
import type { Auth } from '@/features/auth/domain';
import { authRepository } from '@/features/auth/dependencies';

export function useAuths() {
    const [auths, setAuths] = useState<Auth[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAuths = async () => {
            try {
                const data = await authRepository.getAll();
                setAuths(data ?? []);
            } catch {
                setError('Error al cargar los registros de autenticación');
            } finally {
                setLoading(false);
            }
        };

        loadAuths();
    }, []);

    return {
        auths, loading, error
    };
}
