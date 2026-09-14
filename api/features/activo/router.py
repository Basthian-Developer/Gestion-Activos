from fastapi import APIRouter
from .service import ActivoService
from .postgresql_repo import PostgresActivoRepository
from .schemas import Activo

router = APIRouter(
    prefix="/api/activos",
    tags=["Activos"]
)

repository = PostgresActivoRepository()
service = ActivoService(repository)

@router.get("/get_all", response_model=list[Activo])
def get_all_activos():
    return service.get_all()