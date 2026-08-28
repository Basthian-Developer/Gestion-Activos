from fastapi import FastAPI
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from features.test.health import router as healthRouter

app = FastAPI()

@app.get("/api")
def root():
    return {"message": "API funcionando"}

app.include_router(healthRouter)