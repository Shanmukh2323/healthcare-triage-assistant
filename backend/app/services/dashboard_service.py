from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.models.escalation_queue import EscalationQueue
from app.models.triage_history import TriageHistory
from sqlalchemy import func


def get_dashboard_stats(db: Session):

    total_patients = (
        db.query(Patient)
        .count()
    )

    total_triages = (
        db.query(TriageHistory)
        .count()
    )

    pending_escalations = (
        db.query(EscalationQueue)
        .filter(
            EscalationQueue.status == "pending"
        )
        .count()
    )

    resolved_escalations = (
        db.query(EscalationQueue)
        .filter(
            EscalationQueue.status == "resolved"
        )
        .count()
    )

    red_cases = (
        db.query(EscalationQueue)
        .filter(
            EscalationQueue.triage_level == "RED"
        )
        .count()
    )

    return {
        "total_patients": total_patients,
        "total_triages": total_triages,
        "pending_escalations": pending_escalations,
        "resolved_escalations": resolved_escalations,
        "red_cases": red_cases
    }

def get_doctor_performance(db: Session):

    doctors = (
        db.query(
            EscalationQueue.assigned_doctor
        )
        .filter(
            EscalationQueue.assigned_doctor.isnot(None)
        )
        .distinct()
        .all()
    )

    result = []

    for doctor in doctors:

        doctor_name = doctor[0]

        assigned_cases = (
            db.query(EscalationQueue)
            .filter(
                EscalationQueue.assigned_doctor
                == doctor_name
            )
            .count()
        )

        resolved_cases = (
            db.query(EscalationQueue)
            .filter(
                EscalationQueue.assigned_doctor
                == doctor_name,
                EscalationQueue.status
                == "resolved"
            )
            .count()
        )

        pending_cases = (
            db.query(EscalationQueue)
            .filter(
                EscalationQueue.assigned_doctor
                == doctor_name,
                EscalationQueue.status
                == "pending"
            )
            .count()
        )

        result.append(
            {
                "doctor": doctor_name,
                "assigned_cases": assigned_cases,
                "resolved_cases": resolved_cases,
                "pending_cases": pending_cases
            }
        )

    return result