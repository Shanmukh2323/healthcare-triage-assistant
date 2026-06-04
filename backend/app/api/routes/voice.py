from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from app.services.voice_service import (
    save_audio_file
)

router = APIRouter(
    prefix="/voice",
    tags=["Voice"]
)


@router.post("/upload")
async def upload_voice(
    audio: UploadFile = File(...)
):

    file_path = save_audio_file(audio)

    return {
        "message": "Audio uploaded successfully",
        "file_path": file_path
    }