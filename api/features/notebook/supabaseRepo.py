from .repository import NotebookRepository
from core.supabaseClient import supabase

class SupabaseNotebookRepository(NotebookRepository):
    def get_all(self):
        response = (
            supabase
            .schema("gestion_activos")
            .table("Notebook")
            .select("*")
            .execute()
        )

        return response.data