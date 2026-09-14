from fastapi import APIRouter
from .service import NotebookService
from .supabaseRepo import SupabaseNotebookRepository
from .schemas import Notebook

router = APIRouter(
    prefix="/api/notebooks",
    tags=["Notebooks"]
)

repository = SupabaseNotebookRepository()
service = NotebookService(repository)

@router.get("/get_all", response_model=list[Notebook])
def get_all_notebooks():
    return service.get_all()