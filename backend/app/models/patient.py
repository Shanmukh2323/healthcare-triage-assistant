from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.session import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)

    age = Column(Integer, nullable=False)

    gender = Column(String, nullable=False)

    phone_number = Column(String, nullable=True)

    preferred_language = Column(String, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship(
        "User",
        back_populates="patient",
        uselist=False
    )

    triage_history = relationship(
        "TriageHistory",
        back_populates="patient"
    )

    escalations = relationship(
        "EscalationQueue",
        back_populates="patient"
    )
