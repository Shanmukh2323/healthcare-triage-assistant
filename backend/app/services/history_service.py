from app.db.session import SessionLocal

from app.models.triage_history import (
    TriageHistory
)


def save_triage_history(
    transcribed_text,
    medical_analysis,
    patient_id=None,
    db=None
):

    owns_session = db is None
    db = db or SessionLocal()

    try:

        history = TriageHistory(

            patient_id=patient_id,

            transcribed_text=transcribed_text,

            symptoms=", ".join(
                medical_analysis.get(
                    "symptoms",
                    []
                )
            ),

            severity=medical_analysis.get(
                "severity"
            ),

            duration=medical_analysis.get(
                "duration"
            ),

            language=medical_analysis.get(
                "language"
            ),

            triage_level=medical_analysis.get(
                "triage_level"
            ),

            advice=medical_analysis.get(
                "advice"
            ),

            confidence_score=medical_analysis.get(
                "confidence_score"
            ),

            requires_emergency=medical_analysis.get(
                "requires_emergency"
            ),

            escalation_id=medical_analysis.get(
                "escalation_id"
            ),

            assigned_doctor=medical_analysis.get(
                "assigned_doctor"
            ),

            nearest_hospital=medical_analysis.get(
                "nearest_hospital"
            ),

            voice_response_file=medical_analysis.get(
                "voice_response_file"
            )
        )

        db.add(history)

        db.commit()

        db.refresh(history)

        return history

    finally:
        if owns_session:
            db.close()
