from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.schemas.patient import PatientCreate
from app.services.patient_service import create_patient
from app.core.dependencies import get_current_user
from app.core.permissions import require_role

router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)


@router.post("/register")
def register_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    require_role(
        current_user,
        ["admin"]
    )

    return create_patient(db, patient)
