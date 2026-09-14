import { useQuery } from "@tanstack/react-query";
import { getAll, getById } from "@/services/computerService";

export function useComputadores() {
    return useQuery({
        queryKey: ["computadores"],
        queryFn: () => getAll()
    })
}

export function useComputador(id: number) {
    return useQuery({
        queryKey: ["computadores", id],
        queryFn: () => getById(id),
        enabled: id > 0
    })
}