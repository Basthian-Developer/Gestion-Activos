from pydantic import BaseModel

class Notebook(BaseModel):
    id: int
    direccion_ip: str