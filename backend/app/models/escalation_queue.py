from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from datetime import datetime

from app.db.session import Base


class EscalationQueue(Base):

    __tablename__ = "escalation_queue"

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

    patient_name = Column(
        String,
        nullable=True
    )

    phone_number = Column(
        String,
        nullable=True
    )

    nearest_hospital = Column(
        String,
        nullable=True
    )


    patient_text = Column(
        String,
        nullable=False
    )

    triage_level = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="pending"
    )

    symptoms = Column(
        String,
        nullable=True
    )

    severity = Column(
        String,
        nullable=True
    )

    recommended_action = Column(
        String,
        nullable=True
    )

    doctor_notes = Column(
        String,
        nullable=True
    )

    assigned_doctor = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    patient = relationship(
        "Patient",
        back_populates="escalations"
    )

    history_items = relationship(
        "TriageHistory",
        back_populates="escalation"
    )
