import { useQuery } from "@tanstack/react-query";
import { getAll, getById } from '@/services/activosServices'

export function useActivos() {
    return useQuery({
        queryKey: ["activos"],
        queryFn: () => getAll()
    });
}

export function useActivo(id: number) {
    return useQuery({
        queryKey: ["activos", id],
        queryFn: () => getById(id),
        enabled: id > 0
    });
}