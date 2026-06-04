from pydantic import BaseModel, Field


class SymptomInput(BaseModel):
    text: str = Field(min_length=3, max_length=4000)


class SymptomMappingResponse(BaseModel):
    clinical_term: str
    severity: str
    confidence: float
    escalation_required: bool
    triage_level: str
    translated_text: str

    advice: str | None = None

    nearest_hospital: str | None = None

    voice_response_file: str | None = None

    escalation_id: int | None = None
