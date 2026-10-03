"""Listening agent."""

import sys
import os
import json
from datetime import datetime

from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent

sys.path.append("../")
from listening.tools.generate_tool import generate_audio
from listening.tools.transcription_tool import speech_to_text

load_dotenv()

# Configurar el modelo para manejar múltiples herramientas
model = ChatOpenAI(
    temperature=0.7,
    model="gpt-3.5-turbo"
).bind_tools(
    [generate_audio, speech_to_text]
)

with open("./prompts/main.md", "r", encoding="utf-8") as f:
    prompt = f.read()

def run_agent(query_user: str):
    """Run agent."""
    # Lista de herramientas disponibles
    tools = [generate_audio, speech_to_text]

    agent = create_react_agent(model, tools, prompt=prompt)

    response = agent.invoke({"messages": [{"role": "user", "content": query_user}]})

    # Extraer el contenido de la respuesta del asistente
    if response and "messages" in response and len(response["messages"]) > 1:
        return response["messages"][-1].content
    return "No se pudo obtener una respuesta del asistente."


if __name__ == "__main__":
    # user_input = input("...")
    user_input = """
    Diseña una sesión en inglés para un estudiante A2, 
    tenemos 15 minutos
    """
    result = run_agent(user_input)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    result = json.loads(result)

    output_path = f"./outputs/planning/session_{timestamp}.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=4, ensure_ascii=False)

    print(f"Resultado guardado en: {os.path.abspath(output_path)}")
