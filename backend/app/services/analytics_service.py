from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.models.triage_history import TriageHistory
from app.models.escalation_queue import EscalationQueue


def get_analytics_summary(db: Session):

    total_assessments = db.query(TriageHistory).count()
    red_cases = (
        db.query(TriageHistory)
        .filter(TriageHistory.triage_level == "RED")
        .count()
    )
    pending_escalations = (
        db.query(EscalationQueue)
        .filter(EscalationQueue.status == "pending")
        .count()
    )
    resolved_escalations = (
        db.query(EscalationQueue)
        .filter(EscalationQueue.status == "resolved")
        .count()
    )

    return {

        "total_patients":
            db.query(Patient).count(),

        "total_assessments":
            total_assessments,

        "total_triages":
            total_assessments,

        "total_escalations":
            db.query(EscalationQueue).count(),

        "pending_escalations":
            pending_escalations,

        "resolved_escalations":
            resolved_escalations,

        "red_cases":
            red_cases
    }
