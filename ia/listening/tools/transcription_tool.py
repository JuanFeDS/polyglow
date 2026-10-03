"""Transcription tool."""
import os
from pathlib import Path

from openai import OpenAI
from dotenv import load_dotenv

from langchain_core.tools import tool

load_dotenv()

@tool
def speech_to_text(text: str, output_file: Path, model: str = "whisper-1"):
    """Transcribe audio file to text.
    
    Args:
        text (str): Text to transcribe.
        model (str, optional): Model to use for transcription. Defaults to "whisper-1".
    
    Returns:
        str: Transcribed text.
    """

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    with open(output_file, "rb") as f:
        transcription = client.audio.transcriptions.create(
            model=model,
            file=f,
            language="en",
            response_format="verbose_json"
        )

    text = transcription.text
    return text
