import { useQuery } from "@tanstack/react-query";
import { getAll, getById } from '@/services/perifericoService'

export function usePerifericos() {
    return useQuery({
        queryKey: ["perifericos"],
        queryFn: () => getAll()
    });
}

export function usePeriferico(id: number) {
    return useQuery({
        queryKey: ["perifericos", id],
        queryFn: () => getById(id),
        enabled: id > 0
    });
}