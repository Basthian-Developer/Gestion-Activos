import type periferico from "@/models/Periferico";

export default interface PerifericoRepository {
    getAll(): Promise<periferico[]>;
    getById(id: number): Promise<periferico | null>;
}