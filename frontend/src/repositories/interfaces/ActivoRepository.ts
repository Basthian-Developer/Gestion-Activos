import type activo from "@/models/Activo";

export default interface ActivoRepository {
    getAll(): Promise<activo[]>;
    getById(id: number): Promise<activo | null>;
}