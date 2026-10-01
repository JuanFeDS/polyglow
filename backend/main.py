from fastapi import FastAPI

app = FastAPI(title="Polyglow API", version="0.1.0")

@app.get("/")
def read_root():
    """Root endpoint"""
    return {"status": "ok", "service": "polyglow-back"}


@app.get("/ping")
def ping():
    """Ping endpoint"""
    return {"message": "pong"}
