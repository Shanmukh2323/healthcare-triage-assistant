from pydub import AudioSegment
import uuid
import os


def convert_to_wav(input_path):

    unique_name = f"{uuid.uuid4()}.wav"

    output_path = os.path.join(
        "temp_uploads",
        unique_name
    )

    audio = AudioSegment.from_file(input_path)

    audio = audio.set_channels(1)

    audio = audio.set_frame_rate(16000)

    audio = audio.set_sample_width(2)

    audio.export(
        output_path,
        format="wav"
    )

    return output_path