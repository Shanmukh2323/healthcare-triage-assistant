from starlette.middleware.base import BaseHTTPMiddleware

from fastapi import Request

from app.db.session import SessionLocal

from app.services.audit_service import (
    create_audit_log
)


class AuditMiddleware(BaseHTTPMiddleware):

    async def dispatch(
        self,
        request: Request,
        call_next
    ):

        response = await call_next(request)

        db = SessionLocal()

        try:

            create_audit_log(
                db=db,

                action=f"""
                {request.method}
                {request.url.path}
                """,

                performed_by="system",

                details=f"""
                Path: {request.url.path},
                Method: {request.method},
                Status: {response.status_code}
                """
            )

        finally:
            db.close()

        return response