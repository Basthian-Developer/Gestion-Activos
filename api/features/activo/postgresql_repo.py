from .repository import ActivoRepository
from core.connection import SessionLocal
from sqlalchemy import text

class PostgresActivoRepository(ActivoRepository):
    def get_all(self):
        with SessionLocal() as session:
            result = session.execute(
                text("SELECT * FROM activo")
            )
            return result.fetchall()

    def get_by_id(self, activo_id: int):
        pass

    def create(self, activo_data: dict):
        pass
    
    def update(self, activo_id: int, activo_data: dict):
        pass
    
    def delete(self, activo_id: int):
        pass