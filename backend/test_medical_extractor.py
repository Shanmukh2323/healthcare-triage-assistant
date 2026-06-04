from app.ai_pipeline.speech_to_text import transcribe_audio
from app.ai_pipeline.medical_extractor import extract_medical_info


audio_path = "recording.m4a"


transcribed_text = transcribe_audio(audio_path)

print("\nTRANSCRIBED TEXT:")
print(transcribed_text)


medical_result = extract_medical_info(transcribed_text)

print("\nMEDICAL ANALYSIS:")
print(medical_result)