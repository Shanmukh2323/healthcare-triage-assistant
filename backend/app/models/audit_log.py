from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.db.session import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    action = Column(String, nullable=False)

    performed_by = Column(String, nullable=False)

    details = Column(String, nullable=False)

    timestamp = Column(DateTime, default=datetime.utcnow)