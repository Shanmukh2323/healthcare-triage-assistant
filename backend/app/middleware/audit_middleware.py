from starlette.middleware.base import BaseHTTPMiddleware

from fastapi import Request

from app.db.session import SessionLocal

from app.services.audit_service import (
    create_audit_log
)
from app.core.auth import verify_token


class AuditMiddleware(BaseHTTPMiddleware):

    async def dispatch(
        self,
        request: Request,
        call_next
    ):

        if request.url.path == "/metrics":
            return await call_next(request)

        response = await call_next(request)

        db = SessionLocal()

        try:
            performed_by = "anonymous"
            authorization = request.headers.get(
                "authorization",
                ""
            )

            if authorization.lower().startswith("bearer "):
                payload = verify_token(
                    authorization.split(" ", 1)[1]
                )

                if payload:
                    performed_by = (
                        f"{payload.get('sub', 'unknown')}"
                        f":{payload.get('role', 'unknown')}"
                    )

            create_audit_log(
                db=db,

                action=f"""
                {request.method}
                {request.url.path}
                """,

                performed_by=performed_by,

                details=f"""
                Path: {request.url.path},
                Method: {request.method},
                Status: {response.status_code},
                Client: {request.client.host if request.client else "unknown"}
                """
            )

        except Exception:
            pass

        finally:
            db.close()

        return response
