from fastapi import APIRouter

from app.db.session import SessionLocal

from app.services.dashboard_service import (
    get_dashboard_stats
)

from app.services.dashboard_service import (
    get_doctor_performance
)

from fastapi import Depends

from app.core.dependencies import (
    get_current_user
)

from app.core.permissions import (
    require_role
)

router = APIRouter()


@router.get("/dashboard/stats")
def dashboard_stats(
    current_user=Depends(
        get_current_user
    )
):

    require_role(
        current_user,
        ["admin"]
    )

    db = SessionLocal()

    try:
        return get_dashboard_stats(db)

    finally:
        db.close()

@router.get(
    "/dashboard/doctor-performance"
)
def doctor_performance(
    current_user=Depends(
        get_current_user
    )
):

    require_role(
        current_user,
        ["admin"]
    )

    db = SessionLocal()

    try:

        return get_doctor_performance(db)

    finally:
        db.close()