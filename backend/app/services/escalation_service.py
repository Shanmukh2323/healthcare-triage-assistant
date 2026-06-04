from app.models.escalation_queue import (
    EscalationQueue
)
from app.models.triage_history import (
    TriageHistory
)


def create_escalation(
    db,
    patient_id,
    patient_name,
    phone_number,
    patient_text,
    triage_level,
    nearest_hospital
):

    escalation = EscalationQueue(
        patient_id=patient_id,
        patient_name=patient_name,
        phone_number=phone_number,
        patient_text=patient_text,
        triage_level=triage_level,
        nearest_hospital=nearest_hospital,
        status="pending"
    )

    db.add(escalation)

    db.commit()

    db.refresh(escalation)

    return escalation

def resolve_escalation(
    db,
    escalation_id
):

    escalation = (
        db.query(EscalationQueue)
        .filter(
            EscalationQueue.id == escalation_id
        )
        .first()
    )

    if not escalation:
        return None

    escalation.status = "resolved"

    (
        db.query(TriageHistory)
        .filter(TriageHistory.escalation_id == escalation_id)
        .update({"assigned_doctor": escalation.assigned_doctor})
    )

    db.commit()

    db.refresh(escalation)

    return escalation

def add_doctor_note(
    db,
    escalation_id,
    note
):

    escalation = (
        db.query(EscalationQueue)
        .filter(
            EscalationQueue.id == escalation_id
        )
        .first()
    )

    if not escalation:
        return None

    escalation.doctor_notes = note

    db.commit()

    db.refresh(escalation)

    return escalation

def assign_doctor(
    db,
    escalation_id,
    doctor_name
):

    escalation = (
        db.query(EscalationQueue)
        .filter(
            EscalationQueue.id == escalation_id
        )
        .first()
    )

    if not escalation:
        return None

    escalation.assigned_doctor = doctor_name

    (
        db.query(TriageHistory)
        .filter(TriageHistory.escalation_id == escalation_id)
        .update({"assigned_doctor": doctor_name})
    )

    db.commit()

    db.refresh(escalation)

    return escalation


def filter_escalations(
    db,
    status=None,
    triage_level=None,
    doctor=None
):

    query = db.query(
        EscalationQueue
    )

    if status:
        query = query.filter(
            EscalationQueue.status == status
        )

    if triage_level:
        query = query.filter(
            EscalationQueue.triage_level == triage_level
        )

    if doctor:
        query = query.filter(
            EscalationQueue.assigned_doctor == doctor
        )

    return query.all()
