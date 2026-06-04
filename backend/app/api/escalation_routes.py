from fastapi import APIRouter
from fastapi import Query
from fastapi import Depends
from fastapi import HTTPException

from app.db.session import SessionLocal

from app.models.escalation_queue import (
    EscalationQueue
)

from app.services.escalation_service import (
    resolve_escalation
)

from app.schemas.doctor_note import (
    DoctorNoteRequest
)

from app.services.escalation_service import (
    add_doctor_note
)

from app.schemas.doctor_assignment import (
    DoctorAssignmentRequest
)

from app.services.escalation_service import (
    assign_doctor
)

from app.services.escalation_service import (
    filter_escalations
)

from app.core.dependencies import (
    get_current_user
)

from app.core.permissions import (
    require_role
)

router = APIRouter()


@router.get("/escalations")
def get_escalations(
    current_user=Depends(
        get_current_user
    )
):

    require_role(
        current_user,
        ["doctor", "admin", "asha"]
    )

    db = SessionLocal()

    try:

        return db.query(
            EscalationQueue
        ).all()

    finally:
        db.close()


@router.put(
    "/escalations/{escalation_id}/resolve"
)
def resolve_case(
    escalation_id: int,
    current_user=Depends(
        get_current_user
    )
):
    require_role(
        current_user,
        ["doctor", "admin"]
    )

    db = SessionLocal()

    try:

        escalation = resolve_escalation(
            db,
            escalation_id
        )

        if not escalation:
            raise HTTPException(
                status_code=404,
                detail="Escalation not found"
            )

        return {
            "success": True,
            "message": "Escalation resolved",
            "escalation": escalation
        }

    finally:
        db.close()

@router.put(
    "/escalations/{escalation_id}/note"
)
def add_note(
    escalation_id: int,
    request: DoctorNoteRequest,
    current_user=Depends(
        get_current_user
    )
):
    require_role(
        current_user,
        ["doctor", "admin"]
    )


    db = SessionLocal()

    try:

        escalation = add_doctor_note(
            db,
            escalation_id,
            request.note
        )

        if not escalation:
            raise HTTPException(
                status_code=404,
                detail="Escalation not found"
            )

        return {
            "success": True,
            "message": "Doctor note added"
        }

    finally:
        db.close()



@router.put(
    "/escalations/{escalation_id}/assign"
)

def assign_case(
    escalation_id: int,
    request: DoctorAssignmentRequest,
    current_user=Depends(
        get_current_user
    )
):
    require_role(
        current_user,
        ["admin"]
    )

    db = SessionLocal()

    try:

        escalation = assign_doctor(
            db,
            escalation_id,
            request.doctor_name
        )

        if not escalation:
            raise HTTPException(
                status_code=404,
                detail="Escalation not found"
            )

        return {
            "message": "Doctor assigned successfully",
            "escalation_id": escalation.id,
            "assigned_doctor": escalation.assigned_doctor
        }

    finally:
        db.close()

@router.get("/escalations/filter")
def get_filtered_escalations(
    status: str = Query(None),
    triage_level: str = Query(None),
    doctor: str = Query(None),
    current_user=Depends(
        get_current_user
    )
):
    require_role(
        current_user,
        ["doctor", "admin", "asha"]
    )


    db = SessionLocal()

    try:

        results = filter_escalations(
            db=db,
            status=status,
            triage_level=triage_level,
            doctor=doctor
        )

        return results

    finally:
        db.close()

@router.get("/whoami")
def whoami(
    current_user=Depends(get_current_user)
):
    return current_user
