from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.user import (
    UserRegister,
    UserResponse
)

from app.services.user_service import (
    create_user
)

from app.schemas.user import (
    UserLogin,
    TokenResponse
)

from app.services.user_service import (
    authenticate_user
)

from app.core.auth import (
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserResponse
)
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    try:

        created_user = create_user(
            db=db,
            username=user.username,
            password=user.password,
            role=user.role,
            full_name=user.full_name,
            age=user.age,
            gender=user.gender,
            phone_number=user.phone_number,
            preferred_language=user.preferred_language
        )

        return created_user

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        credentials.username,
        credentials.password
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {
            "sub": user.username,
            "role": user.role,
            "user_id": user.id,
            "patient_id": user.patient_id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
