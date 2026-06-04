from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

from app.db.session import Base


class TriageSession(Base):
    __tablename__ = "triage_sessions"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))

    triage_level = Column(String, nullable=True)

    escalation_status = Column(String, default="not_escalated")

    ai_confidence = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)