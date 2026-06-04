from fastapi import APIRouter
from fastapi import Depends

from app.db.session import SessionLocal

from app.models.patient import Patient

from app.core.dependencies import (
    get_current_user
)

from app.core.permissions import (
    require_role
)

router = APIRouter()


@router.get("/patients")
def get_patients(
    current_user=Depends(
        get_current_user
    )
):

    require_role(
        current_user,
        [
            "admin",
            "doctor",
            "asha"
        ]
    )

    db = SessionLocal()

    try:

        patients = db.query(
            Patient
        ).all()

        return patients

    finally:
        db.close()