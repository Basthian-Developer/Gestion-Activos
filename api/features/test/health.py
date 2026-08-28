from fastapi import APIRouter
from supabaseClient import supabase

router = APIRouter(
    prefix="/api/health",
    tags=["Health"]
)

@router.get("/")
def health():
    return {"status": "ok"}

@router.get("/computadores")
def getComputadores():
    response = supabase.schema("gestion_activos").table("Computador").select("*").execute()

    return {
        "status": "ok",
        "data": response.data
    }