from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.schemas.patient import PatientCreate


def create_patient(db: Session, patient: PatientCreate):
    db_patient = Patient(
        full_name=patient.full_name,
        age=patient.age,
        gender=patient.gender,
        phone_number=patient.phone_number,
        preferred_language=patient.preferred_language
    )

    db.add(db_patient)

    db.commit()

    db.refresh(db_patient)

    return db_patient