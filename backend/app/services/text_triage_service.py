from app.db.session import SessionLocal

from app.models.triage_history import (
    TriageHistory
)


def save_text_triage(
    patient_text,
    analysis_result
):

    db = SessionLocal()

    try:

        history = TriageHistory(

            transcribed_text=patient_text,

            symptoms=analysis_result.get(
                "clinical_term"
            ),

            severity=analysis_result.get(
                "severity"
            ),

            triage_level=analysis_result.get(
                "triage_level"
            ),

            confidence_score=analysis_result.get(
                "confidence"
            ),

            requires_emergency=analysis_result.get(
                "escalation_required"
            )
        )

        db.add(history)

        db.commit()

        db.refresh(history)

        return history

    finally:

        db.close()