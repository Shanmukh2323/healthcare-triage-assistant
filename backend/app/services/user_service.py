from sqlalchemy.orm import Session

from app.models.user import User
from app.models.patient import Patient

from app.core.security import (
    hash_password
)

from app.core.security import (
    verify_password
)


def create_user(
    db: Session,
    username: str,
    password: str,
    role: str,
    full_name: str | None = None,
    age: int | None = None,
    gender: str | None = None,
    phone_number: str | None = None,
    preferred_language: str | None = None
):

    existing_user = (
        db.query(User)
        .filter(
            User.username == username
        )
        .first()
    )

    if existing_user:
        raise Exception(
            "Username already exists"
        )

    patient = None

    if role == "patient":
        patient = Patient(
            full_name=full_name or username,
            age=age if age is not None else 0,
            gender=gender or "Not specified",
            phone_number=phone_number,
            preferred_language=preferred_language or "English"
        )

        db.add(patient)
        db.flush()

    user = User(
        username=username,
        password_hash=hash_password(password),
        role=role,
        patient_id=patient.id if patient else None
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user

def authenticate_user(
    db,
    username,
    password
):

    user = (
        db.query(User)
        .filter(
            User.username == username
        )
        .first()
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    return user
