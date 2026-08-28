from fastapi import FastAPI
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from features.test import health

app = FastAPI()

@app.get("/api")
def root():
    return {"message": "API funcionando"}

@app.get("/api/prueba")
def prueba():
    return {"message": "prueba funcionando"}

app.include_router(
    health.router,
    prefix="/api/health",
    tags=["Health"]
)