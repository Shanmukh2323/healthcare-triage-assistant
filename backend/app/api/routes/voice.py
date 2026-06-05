from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)

from app.services.voice_service import (
    save_audio_file
)
from app.core.dependencies import get_current_user
from app.core.permissions import require_role

router = APIRouter(
    prefix="/voice",
    tags=["Voice"]
)


@router.post("/upload")
async def upload_voice(
    audio: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    require_role(
        current_user,
        ["patient"]
    )

    file_path = save_audio_file(audio)

    return {
        "message": "Audio uploaded successfully",
        "file_path": file_path
    }
