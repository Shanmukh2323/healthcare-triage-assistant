from app.api.routes.patient import router as patient_router
from app.middleware.audit_middleware import AuditMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.api.voice_routes import router as voice_router
from app.api.routes.symptom import router as symptom_router

from app.db.session import engine

from app.api.history_routes import (
    router as history_router
)

from app.api.escalation_routes import (
    router as escalation_router
)

from app.api.dashboard_routes import (
    router as dashboard_router
)

from app.api.auth_routes import (
    router as auth_router
)

from app.api.analytics_routes import (
    router as analytics_router
)

from app.api.patient_management_routes import (
    router as patient_management_router
)


app = FastAPI()

# Middleware
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(AuditMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(patient_router)
app.include_router(symptom_router)
app.include_router(voice_router)
app.include_router(history_router)
app.include_router(escalation_router)
app.include_router(
    dashboard_router
)

app.include_router(
    analytics_router
)
app.include_router(auth_router)

app.include_router(
    patient_management_router
)

app.mount(
    "/audio_responses",
    StaticFiles(
        directory="audio_responses"
    ),
    name="audio_responses"
)

@app.get("/")
def root():
    return {
        "message": "Healthcare Triage Assistant Backend Running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "success",
        "message": "Backend connected successfully"
    }


@app.get("/db-check")
def db_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "success",
            "message": "Database connected successfully"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
