from fastapi import FastAPI

from features.test.health import router as healthRouter

app = FastAPI()

@app.get("/api")
def root():
    return {"message": "API funcionando"}

app.include_router(healthRouter)