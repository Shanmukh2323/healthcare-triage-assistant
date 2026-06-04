import os
import json

from dotenv import load_dotenv
from groq import Groq

from app.rules_engine.triage_rules import (
    calculate_triage_level
)

from app.rules_engine.emergency_rules import (
    check_emergency,
    requires_human_review
)

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_advice(severity):

    severity = severity.lower()

    if severity == "severe":
        return (
            "Seek immediate medical attention. "
            "Visit nearest hospital or call emergency services."
        )

    elif severity == "moderate":
        return (
            "Consult a doctor soon and monitor symptoms carefully."
        )

    return (
        "Monitor symptoms, take rest, stay hydrated."
    )


def extract_medical_info(text: str):

    prompt = f"""
    You are an expert multilingual healthcare triage assistant.

    The patient statement may be:
    - English
    - Hindi
    - Telugu
    - Telugu spoken words transcribed in Hindi script
    - Romanized Indian language speech transcription

    Understand the intended medical meaning carefully.

    Patient statement:
    "{text}"

    Return STRICT JSON ONLY:

    {{
        "symptoms": [],
        "severity": "",
        "duration": "",
        "language": ""
    }}

    Rules:
    - severity must be:
      mild / moderate / severe

    - if duration not mentioned:
      return "not specified"

    - detect symptoms accurately even if the
      sentence is partially incorrect or phonetically written

    Examples:

    Input:
    "नाको ज्वरंगा उंदी"

    Meaning:
    Telugu phrase meaning:
    "I have fever"

    Output:
    {{
        "symptoms": ["fever"],
        "severity": "mild",
        "duration": "not specified",
        "language": "Telugu"
    }}

    Input:
    "गुंडे नोप्पि"

    Meaning:
    "Chest pain"

    Output:
    {{
        "symptoms": ["chest pain"],
        "severity": "severe",
        "duration": "not specified",
        "language": "Telugu"
    }}

    Input:
    "अखो कड़ब लो चाला नप्पिगा आंदी"

    Meaning:
    "Severe stomach pain"

    Output:
    {{
        "symptoms": ["stomach pain"],
        "severity": "severe",
        "duration": "not specified",
        "language": "Telugu"
    }}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a multilingual medical AI assistant."
                )
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0,
        response_format={
            "type": "json_object"
        }
    )

    result = response.choices[0].message.content

    parsed_result = json.loads(result)

    symptoms = parsed_result.get(
        "symptoms",
        []
    )

    severity = parsed_result.get(
        "severity",
        "mild"
    ).lower()

    clinical_term = " ".join(symptoms)

    escalation_required = check_emergency(
        symptoms
    )

    confidence_score = 0.92

    human_review_required = (
        requires_human_review(
            confidence_score
        )
    )

    triage_level = calculate_triage_level(
        clinical_term=clinical_term,
        severity=severity,
        confidence=confidence_score,
        escalation_required=escalation_required
    )

    advice = generate_advice(severity)

    parsed_result["triage_level"] = triage_level

    parsed_result["advice"] = advice

    parsed_result["confidence_score"] = (
        confidence_score
    )

    parsed_result["human_review_required"] = (
        human_review_required
    )

    if escalation_required:
        parsed_result["emergency_message"] = (
            "Emergency symptoms detected. "
            "Immediate medical attention required."
        )
    if human_review_required:
        parsed_result["human_review_message"] = (
            "AI confidence is low. "
            "Human medical review recommended."
        )

    parsed_result["requires_emergency"] = (
        triage_level == "RED"
    )

    parsed_result["escalation_required"] = (
        triage_level == "RED"
    )

    return parsed_result