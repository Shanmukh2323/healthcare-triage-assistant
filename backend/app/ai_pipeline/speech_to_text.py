import torch

from transformers import pipeline

from app.utils.audio_converter import convert_to_wav


DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

pipe = None


def get_speech_pipeline():
    global pipe

    if pipe is None:
        pipe = pipeline(
            task="automatic-speech-recognition",
            model="openai/whisper-small",
            chunk_length_s=30,
            device=0 if DEVICE == "cuda" else -1,
        )

    return pipe


def transcribe_audio(audio_path: str):

    wav_path = convert_to_wav(audio_path)

    print("\n====================")
    print("AUDIO FILE:")
    print(wav_path)
    print("====================\n")

    result = get_speech_pipeline()(
        wav_path,
        generate_kwargs={
            "task": "transcribe",
        }
    )

    print("\n====================")
    print("TRANSCRIBED TEXT:")
    print(result["text"])
    print("====================\n")

    return result["text"]
