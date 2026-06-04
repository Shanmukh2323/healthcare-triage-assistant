EMERGENCY_SYMPTOMS = [

    "chest pain",
    "heart pain",
    "difficulty breathing",
    "shortness of breath",
    "unconscious",
    "seizure",
    "stroke",
    "severe bleeding",
    "vomiting blood",

    # ADD THESE
    "severe stomach pain",
    "stomach pain",
    "abdominal pain",
    "severe abdominal pain",

]


def check_emergency(symptoms):

    normalized = [
        symptom.lower().strip()
        for symptom in symptoms
    ]

    for symptom in normalized:

        if symptom in EMERGENCY_SYMPTOMS:
            return True

    return False

def requires_human_review(confidence):

    return confidence < 0.75