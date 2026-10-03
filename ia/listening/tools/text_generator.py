"""Iterative Text Generation Agent."""

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from pathlib import Path

load_dotenv()


def read_prompt(file_path: str) -> str:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Prompt file not found: {file_path}")
    return path.read_text(encoding="utf-8")


def create_client(temperature: float = 0.2, model: str = "gpt-4o") -> ChatOpenAI:
    return ChatOpenAI(temperature=temperature, model=model)


def generate_response(client: ChatOpenAI, prompt_template: str, **kwargs) -> str:
    # Reemplazamos manualmente las variables en el prompt
    formatted_prompt = prompt_template
    for key, value in kwargs.items():
        placeholder = f"{{{key}}}"
        formatted_prompt = formatted_prompt.replace(placeholder, str(value))

    # Creamos un prompt simple con el texto ya formateado
    prompt = PromptTemplate.from_template("{text}")

    # Invocamos el LLM con el prompt formateado
    response = client.invoke(prompt.format(text=formatted_prompt))
    return response.content


class IterativeTextAgent:
    """Agent to iteratively generate, evaluate and improve texts."""

    def __init__(self, max_iterations: int = 3):
        self.client = create_client()
        self.max_iterations = max_iterations
        self.generator_prompt = read_prompt("./tools/prompt_generator.md")
        self.evaluator_prompt = read_prompt("./tools/prompt_evaluator.md")
        self.final_prompt = read_prompt("./tools/prompt_final.md")

    def evaluate_text(self, text: str, level: str, duration: int) -> str:
        """Evaluate a text using the evaluator prompt."""
        prompt = self.evaluator_prompt.format(text=text, level=level, duration=duration)
        return generate_response(self.client, prompt, level=level, duration=duration)

    def improve_text(
        self, original_text: str, feedback: str, level: str, duration: int
    ) -> str:
        """Generate improved text from original text and feedback."""
        return generate_response(
            self.client,
            self.final_prompt,
            original_text=original_text,
            feedback=feedback,
            level=level,
            duration=duration,
        )

    def _extract_word_count(self, feedback: str) -> int:
        """Extrae el conteo de palabras del feedback."""
        import re

        match = re.search(r"PALABRAS:\s*(\d+)", feedback)
        return int(match.group(1)) if match else 0

    def _extract_duration_status(self, feedback: str) -> str:
        """Extrae el estado de cumplimiento de la duración."""
        if "Duración: ✅" in feedback:
            return "perfect"
        elif "Duración: ⚠️" in feedback:
            return "close"
        return "needs_improvement"

    def save_to_file(self, text: str, filename: str = "generated_text.txt") -> str:
        """Guarda el texto en un archivo y devuelve la ruta del archivo."""
        with open(filename, "w", encoding="utf-8") as f:
            f.write(text)
        return str(Path(filename).resolve())

    def run(self, input_user: str, level: str, duration: int):
        """Run iterative generation and improvement."""
        target_words = duration * 100
        current_text = generate_response(
            self.client,
            self.generator_prompt,
            input_user=input_user,
            level=level,
            duration=duration,
            target_words=target_words,
        )

        print(
            f"\n{'='*50}\nInitial generated text ({self._extract_word_count(str(current_text))} words):\n{current_text}\n"
        )

        iteration = 1
        max_iterations = 5  # Límite máximo de iteraciones por seguridad

        while iteration <= max_iterations:
            feedback = self.evaluate_text(current_text, level, duration)
            print(f"\n{'='*50}\nIteration {iteration} - Feedback:\n{feedback}\n")

            # Verificar si el texto cumple con los requisitos
            if "Nivel: ✅" in feedback and "Duración: ✅" in feedback:
                print("✅ Texto cumple con todos los requisitos")
                break

            # Mejorar el texto actual
            current_text = self.improve_text(current_text, feedback, level, duration)
            current_word_count = self._extract_word_count(str(current_text))
            print(
                f"Iteration {iteration} - Improved Text ({current_word_count} words):\n{current_text}"
            )

            iteration += 1

        print("\n" + "=" * 50)
        final_feedback = self.evaluate_text(current_text, level, duration)

        # Guardar el texto final en un archivo
        filename = f"generated_text_{level}_{duration}min.txt"
        filepath = self.save_to_file(current_text, filename)
        print(f"\n✅ Texto guardado en: {filepath}")

        return current_text, final_feedback, filepath


if __name__ == "__main__":
    agent = IterativeTextAgent()
    final_text, final_feedback, filepath = agent.run("Juego de tronos", "C1", 7)

    print("\n" + "=" * 50)
    print("RESUMEN FINAL:")
    print(f"- Archivo generado: {filepath}")
    print(f"- Número de palabras: {agent._extract_word_count(final_text)}")
    print("\nTexto generado:")
    print("-" * 50)
    print(final_text)
    print("-" * 50)
    print("\nFeedback final:")
    print("-" * 50)
    print(final_feedback)
