import type computador from "@/models/Computador";

export default interface ComputerRepository{
    getAll(): Promise<computador[] | null>;
    getById(id: number): Promise<computador | null>; 
}