from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def create_audit_log(
    db: Session,
    action: str,
    performed_by: str,
    details: str
):
    audit = AuditLog(
        action=action,
        performed_by=performed_by,
        details=details
    )

    db.add(audit)

    db.commit()

    db.refresh(audit)

    return audit