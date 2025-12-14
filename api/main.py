from fastapi import FastAPI
from api.routers import index

app = FastAPI()

app.include_router(index.router)
