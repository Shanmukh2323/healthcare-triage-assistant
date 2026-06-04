from app.db.session import SessionLocal

from app.models.patient import Patient
from app.models.triage_history import TriageHistory

db = SessionLocal()

try:

    red_cases = db.query(
        TriageHistory
    ).filter(
        TriageHistory.triage_level == "RED"
    ).all()

    count = 0

    for case in red_cases:

        case.requires_emergency = True

        count += 1

    db.commit()

    print(
        f"Updated {count} RED cases"
    )

finally:
    db.close()