from app.ai_pipeline.speech_to_text import (
    transcribe_audio
)


audio_path = "audio/test.wav"

result = transcribe_audio(audio_path)

print(result)