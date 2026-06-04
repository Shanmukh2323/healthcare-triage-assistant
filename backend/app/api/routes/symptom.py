from fastapi import APIRouter, Depends, HTTPException

from app.schemas.symptom import (
    SymptomInput,
    SymptomMappingResponse
)

from app.services.symptom_service import (
    map_symptom_to_clinical_term
)

from app.services.tts_service import (
    generate_voice_response
)

from app.services.history_service import (
    save_triage_history
)

from app.services.escalation_service import (
    create_escalation
)

from app.db.dependencies import get_db
from app.models.patient import Patient
from app.core.dependencies import get_current_user
from app.core.permissions import require_role

router = APIRouter(
    prefix="/symptoms",
    tags=["Symptoms"]
)


def generate_advice(severity):

    severity = severity.lower()

    if severity == "severe":

        return (
            "Seek immediate medical attention. "
            "Visit nearest hospital immediately."
        )

    elif severity == "moderate":

        return (
            "Consult a doctor soon and monitor symptoms."
        )

    return (
        "Take rest, stay hydrated and monitor symptoms."
    )


@router.post(
    "/map",
    response_model=SymptomMappingResponse
)
def map_symptom(
    symptom: SymptomInput,
    db=Depends(get_db),
    current_user=Depends(get_current_user)
):

    require_role(
        current_user,
        ["patient"]
    )

    patient_id = current_user.get("patient_id")

    patient = None

    if patient_id:
        patient = (
            db.query(Patient)
            .filter(Patient.id == patient_id)
            .first()
        )

    if not patient:
        raise HTTPException(
            status_code=400,
            detail="Patient profile not linked to this account"
        )

    result = map_symptom_to_clinical_term(
        symptom.text
    )

    advice = generate_advice(
        result["severity"]
    )

    result["advice"] = advice

    if result["triage_level"] == "RED":
        result["nearest_hospital"] = "Apollo Hospital Hyderabad"
    else:
        result["nearest_hospital"] = "Nearby Primary Health Center"

    if result["triage_level"] == "RED":

        escalation = create_escalation(
            db=db,
            patient_id=patient.id,
            patient_name=patient.full_name,
            phone_number=patient.phone_number or "Not Available",
            patient_text=symptom.text,
            triage_level="RED",
            nearest_hospital=result.get(
                "nearest_hospital",
                "Nearest Hospital Not Available"
            )
        )

        result["escalation_id"] = (
            escalation.id
        )

    audio_file = generate_voice_response(
        advice
    )

    result["voice_response_file"] = (
        audio_file
    )

    save_triage_history(
        symptom.text,
        {
            "symptoms": [
                result["clinical_term"]
            ],

            "severity":
                result["severity"],

            "duration":
                "not specified",

            "language":
                "Unknown",

            "triage_level":
                result["triage_level"],

            "advice":
                advice,

            "confidence_score":
                result["confidence"],

            "requires_emergency":
                result["escalation_required"],

            "escalation_id":
                result.get("escalation_id"),

            "assigned_doctor":
                None,

            "nearest_hospital":
                result.get("nearest_hospital"),

            "voice_response_file":
                result.get("voice_response_file")
        },
        patient_id=patient.id,
        db=db
    )

    return result
