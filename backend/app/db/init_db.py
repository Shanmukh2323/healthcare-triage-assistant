from app.db.session import engine, Base

from app.models.patient import Patient
from app.models.triage_session import TriageSession
from app.models.audit_log import AuditLog

from app.models.triage_history import (
    TriageHistory
)

from app.models.escalation_queue import (
    EscalationQueue
)

from app.models.user import User

def init_db():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()