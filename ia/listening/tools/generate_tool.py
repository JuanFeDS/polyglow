"""Generate audio tool."""
from pathlib import Path
from openai import OpenAI

from langchain_core.tools import tool

@tool
def generate_audio(text: str, output_file: Path):
    """Generate audio from text.
    
    Args:
        text (str): Text to generate audio from.
        output_file (Path): Path to output file.
    """

    # Inicialización del cliente
    client = OpenAI()

    # Generación de audio con el modelo TTS
    with client.audio.speech.with_streaming_response.create(
        model="gpt-4o-mini-tts",
        voice="alloy",
        input=text,
    ) as response:
        response.stream_to_file(output_file)
