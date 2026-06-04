from fastapi import HTTPException


def require_role(
    current_user,
    allowed_roles
):

    user_role = current_user.get("role")

    if user_role not in allowed_roles:

        raise HTTPException(
            status_code=403,
            detail="Access denied"  
        )

    return True