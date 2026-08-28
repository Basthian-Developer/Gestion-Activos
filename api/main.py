from fastapi import FastAPI

from features.test import health

app = FastAPI()

@app.get("/")
def root():
    return {"message": "API funcionando"}

app.include_router(
    health.router,
    prefix="/api/health",
    tags=["Health"]
)