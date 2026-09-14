import type computador from "@/models/Computador";

export default interface ComputerRepository{
    getAll(): Promise<computador[]>;
    getById(id: number): Promise<computador | null>; 
}