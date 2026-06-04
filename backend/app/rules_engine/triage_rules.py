RED_FLAG_KEYWORDS = [
    "heart attack",
    "angina",
    "stroke",
    "breathing difficulty",
    "severe bleeding",
    "unconscious"
]


YELLOW_FLAG_KEYWORDS = [
    "moderate fever",
    "vomiting",
    "abdominal pain",
    "infection"
]


def calculate_triage_level(
    clinical_term: str,
    severity: str,
    confidence: float,
    escalation_required: bool
):

    clinical_term = clinical_term.lower()

    severity = severity.lower()

    # RED TRIAGE
    if (
        severity == "severe"
        or escalation_required
        or any(
            keyword in clinical_term
            for keyword in RED_FLAG_KEYWORDS
        )
    ):
        return "RED"

    # YELLOW TRIAGE
    if (
        severity == "moderate"
        or any(
            keyword in clinical_term
            for keyword in YELLOW_FLAG_KEYWORDS
        )
    ):
        return "YELLOW"

    # GREEN TRIAGE
    return "GREEN"