from fastapi import FastAPI
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from features.activo.router import router as activo_router

app = FastAPI()

@app.get("/api")
def root():
    return {"message": "API funcionando"}

app.include_router(activo_router)