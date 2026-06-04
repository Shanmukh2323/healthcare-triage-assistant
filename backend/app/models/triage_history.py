from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship

from datetime import datetime

from app.db.session import Base


class TriageHistory(Base):

    __tablename__ = "triage_history"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    patient_id = Column(
        Integer,
        ForeignKey("patients.id"),
        nullable=True
    )

    transcribed_text = Column(
        String,
        nullable=False
    )

    symptoms = Column(String)

    severity = Column(String)

    duration = Column(String)

    language = Column(String)

    triage_level = Column(String)

    advice = Column(String)

    confidence_score = Column(Float)

    escalation_id = Column(
        Integer,
        ForeignKey("escalation_queue.id"),
        nullable=True
    )

    assigned_doctor = Column(
        String,
        nullable=True
    )

    nearest_hospital = Column(
        String,
        nullable=True
    )

    voice_response_file = Column(
        String,
        nullable=True
    )

    requires_emergency = Column(Boolean)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    patient = relationship(
        "Patient",
        back_populates="triage_history"
    )

    escalation = relationship(
        "EscalationQueue",
        back_populates="history_items"
    )
