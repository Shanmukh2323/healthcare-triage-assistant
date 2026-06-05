from datetime import (
    datetime,
    timedelta
)

import json
from jose import (
    JWTError,
    jwt
)
import os
from uuid import uuid4

from app.core.redis_client import redis_client

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "change_this_secret_key_before_production"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = (
        datetime.utcnow()
        + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    session_id = str(uuid4())

    to_encode.update(
        {
            "exp": expire,
            "jti": session_id
        }
    )

    ttl_seconds = ACCESS_TOKEN_EXPIRE_MINUTES * 60

    redis_client.setex(
        f"session:{session_id}",
        ttl_seconds,
        json.dumps({
            "user_id": to_encode.get("user_id"),
            "username": to_encode.get("sub"),
            "role": to_encode.get("role"),
            "patient_id": to_encode.get("patient_id")
        })
    )

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        session_id = payload.get("jti")

        if not session_id:
            return None

        session = redis_client.get(
            f"session:{session_id}"
        )

        if not session:
            return None

        payload["session"] = json.loads(session)

        return payload

    except JWTError:

        return None
    except Exception:

        return None


def revoke_access_token(token: str):
    payload = verify_token(token)

    if not payload:
        return False

    session_id = payload.get("jti")

    if not session_id:
        return False

    redis_client.delete(
        f"session:{session_id}"
    )

    return True


def get_token_session_id(token: str):
    try:
        return jwt.get_unverified_claims(token).get("jti")

    except JWTError:
        return None
