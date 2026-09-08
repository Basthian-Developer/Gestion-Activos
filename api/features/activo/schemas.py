from pydantic import BaseModel
from typing import Any
from datetime import date

class Activo(BaseModel):
    id: int
    serial: str
    campos: list[dict[str, Any]]
    codigo: str
    marca: str
    modelo: str
    obtencion_date: date | None
    estado: str
    garantia: bool
    categoria: str