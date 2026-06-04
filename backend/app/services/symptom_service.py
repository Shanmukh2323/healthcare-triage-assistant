import json

from app.ai_pipeline.groq_client import client

from app.rules_engine.triage_rules import (
    calculate_triage_level
)

from app.services.translation_service import (
    translate_to_english
)

MULTILINGUAL_EMERGENCY_WORDS = [
    "chest pain",
    "heart pain",
    "gunde noppi",
    "gunde",
    "noppi",
    "stroke",
    "breathing problem",
    "breathing difficulty",
    "blood vomiting"
]


CONFIDENCE_THRESHOLD = 0.85


def map_symptom_to_clinical_term(symptom: str):

    lowered_symptom = symptom.lower()

    emergency_detected = any(
        keyword in lowered_symptom
        for keyword in MULTILINGUAL_EMERGENCY_WORDS
    )

    translated_symptom = translate_to_english(
    symptom
    )

    prompt = f"""
    You are a healthcare triage assistant.

    Convert the patient's colloquial symptom into:
    1. Clinical medical terminology
    2. Severity level
    3. Confidence score between 0 and 1

    Patient symptom:
    {translated_symptom}

    Return STRICT JSON only.

    Example:
    {{
        "clinical_term": "Heartburn",
        "severity": "mild",
        "confidence": 0.92
    }}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        response_format={"type": "json_object"}
    )

    content = response.choices[0].message.content

    parsed_response = json.loads(content)

    confidence = parsed_response.get("confidence", 0)

    severity = parsed_response.get(
        "severity",
        ""
    ).lower()

    clinical_term = parsed_response.get(
        "clinical_term",
        ""
    ).lower()

    EMERGENCY_KEYWORDS = [
        "heart attack",
        "chest pain",
        "stroke",
        "breathing difficulty",
        "angina",
        "severe bleeding"
    ]

    escalation_required = (
        confidence < CONFIDENCE_THRESHOLD
        or severity == "severe"
        or emergency_detected
        or any(
            keyword in clinical_term
            for keyword in EMERGENCY_KEYWORDS
        )
    )

    if emergency_detected:
        triage_level = "RED"
    else:
        triage_level = calculate_triage_level(
            clinical_term=clinical_term,
            severity=severity,
            confidence=confidence,
            escalation_required=escalation_required
        )


    parsed_response["escalation_required"] = escalation_required

    parsed_response["triage_level"] = triage_level

    parsed_response["translated_text"] = translated_symptom

    return parsed_response