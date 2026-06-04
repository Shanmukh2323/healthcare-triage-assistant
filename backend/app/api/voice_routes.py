from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)

import shutil
import os
from pathlib import Path
from uuid import uuid4

from app.ai_pipeline.speech_to_text import (
    transcribe_audio
)

from app.ai_pipeline.medical_extractor import (
    extract_medical_info
)

from app.services.tts_service import (
    generate_voice_response
)

from app.services.history_service import (
    save_triage_history
)

from app.db.dependencies import get_db
from app.models.patient import Patient
from app.core.dependencies import get_current_user
from app.core.permissions import require_role

from app.services.escalation_service import (
    create_escalation
)

router = APIRouter()


@router.post("/analyze-audio")
async def analyze_audio(
    file: UploadFile = File(...),
    db=Depends(get_db),
    current_user=Depends(get_current_user)
):

    try:
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

        temp_dir = "temp_uploads"

        os.makedirs(
            temp_dir,
            exist_ok=True
        )

        suffix = Path(
            file.filename or ""
        ).suffix or ".webm"

        file_path = os.path.join(
            temp_dir,
            f"{uuid4()}{suffix}"
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        print(f"\nAudio Saved: {file_path}")

        transcribed_text = transcribe_audio(
            file_path
        )

        medical_analysis = extract_medical_info(
            transcribed_text
        )

        print(medical_analysis)

        if medical_analysis["triage_level"] == "RED":
            escalation = create_escalation(
                db=db,
                patient_id=patient.id,
                patient_name=patient.full_name,
                phone_number=patient.phone_number or "Not Available",
                patient_text=transcribed_text,
                triage_level=medical_analysis["triage_level"],
                nearest_hospital="Nearest Hospital"
            )
            medical_analysis["escalation_id"] = (
                escalation.id
            )

        advice = medical_analysis.get(
            "advice",
            "Please consult a doctor"
        )

        audio_response = generate_voice_response(
            advice
        )

        medical_analysis["voice_response_file"] = (
            audio_response
        )

        save_triage_history(
            transcribed_text,
            medical_analysis,
            patient_id=patient.id,
            db=db
        )

        return {
            "success": True,
            "transcribed_text": transcribed_text,
            "medical_analysis": medical_analysis,
            "voice_response_file": audio_response
        }

    except HTTPException:
        raise

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }
