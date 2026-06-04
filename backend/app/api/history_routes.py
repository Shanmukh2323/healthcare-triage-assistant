from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.dependencies import get_current_user
from app.core.permissions import require_role

from app.models.triage_history import (
    TriageHistory
)

router = APIRouter()


@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    require_role(
        current_user,
        ["patient", "doctor", "admin", "asha"]
    )

    query = db.query(
        TriageHistory
    )

    if current_user.get("role") == "patient":
        query = query.filter(
            TriageHistory.patient_id
            == current_user.get("patient_id")
        )

    history = query.order_by(
        TriageHistory.created_at.desc()
    ).all()

    results = []

    for item in history:

        results.append({

                "id": item.id,

                "transcribed_text":
                    item.transcribed_text,

                "symptoms":
                    item.symptoms,

                "severity":
                    item.severity,

                "duration":
                    item.duration,

                "language":
                    item.language,

                "triage_level":
                    item.triage_level,

                "advice":
                    item.advice,

                "confidence_score":
                    item.confidence_score,

                "requires_emergency":
                    item.requires_emergency,

                "escalation_id":
                    item.escalation_id,

                "assigned_doctor":
                    item.assigned_doctor,

                "nearest_hospital":
                    item.nearest_hospital,

                "voice_response_file":
                    item.voice_response_file,

                "created_at":
                    item.created_at
        })

    return results
