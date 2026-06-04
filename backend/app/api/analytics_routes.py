from fastapi import (
    APIRouter,
    Depends
)

from app.db.session import SessionLocal

from app.core.dependencies import (
    get_current_user
)

from app.core.permissions import (
    require_role
)

from app.services.analytics_service import (
    get_analytics_summary
)

router = APIRouter()


@router.get(
    "/analytics/summary"
)
def analytics_summary(
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

        return get_analytics_summary(db)

    finally:
        db.close()