import type activo from "@/models/Activo";

export default interface ActivoRepository {
    getAll(): Promise<activo[] | null>;
    getById(id: number): Promise<activo | null>;
}