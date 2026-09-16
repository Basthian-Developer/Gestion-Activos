import JsonComputerRepository from "@/repositories/json/JsonComputerRepository";
import JsonActivoRepository from "@/repositories/json/JsonActivoRepository";
import JsonPrinterRepository from "@/repositories/json/JsonPrinterRepository";
import JsonPerifericoRepository from "@/repositories/json/JsonPerifericoRepository";

export const computerRepository = new JsonComputerRepository();

export const activoRepository = new JsonActivoRepository();

export const printerRepository = new JsonPrinterRepository();

export const perifericoRepository = new JsonPerifericoRepository();
