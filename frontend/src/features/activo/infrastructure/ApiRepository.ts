import type { ActivoRepository } from '@/features/activo/repository';
import type { Activo } from '@/features/activo/domain';

export class ApiRepository implements ActivoRepository {
    async getAll(): Promise<Activo[] | null> {
        const response = await fetch("/api/activos/get_all");

        if(!response.ok){
            throw new Error("Error al obtener activos: ${response.status}")
        }
        
        return await response.json() as Activo[];
    }
}