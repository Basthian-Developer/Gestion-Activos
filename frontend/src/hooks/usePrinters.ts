import { useQuery } from "@tanstack/react-query";
import { getAll, getById } from "@/services/printerService";

export function usePrinters() {
    return useQuery({
        queryKey: ["impresoras"],
        queryFn: () => getAll()
    });
}

export function usePrinter(id: number) {
    return useQuery({
        queryKey: ["impresoras", id],
        queryFn: () => getById(id),
        enabled: id > 0
    });
}