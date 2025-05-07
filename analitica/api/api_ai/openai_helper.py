import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# Cargar variables de entorno
load_dotenv()

# Cliente OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Diccionario de nombres de idioma para el prompt
LANGUAGE_NAMES = {
    "en": "English",
    "es": "Spanish"
}

# Base del directorio actual
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Cargar prompts dinámicamente según nivel
def get_all_prompts(language, level):
    try:
        # Ruta al archivo de prompts del nivel correspondiente
        prompt_path = os.path.join(BASE_DIR, "..", "services", "prompts", f"{level}.json")

        with open(prompt_path, "r", encoding="utf-8") as f:
            all_prompts = json.load(f)

        # Devuelve los prompts en el idioma especificado, o cae en inglés
        return all_prompts.get(language, all_prompts["en"])

    except FileNotFoundError:
        raise ValueError(f"Prompt file for level '{level}' not found.")
    except json.JSONDecodeError:
        raise ValueError(f"Prompt file for level '{level}' is not a valid JSON.")

# Interpretar todo el análisis con una sola llamada
def interpret_analysis(summary, language, level="level1"):
    prompts = get_all_prompts(language, level)

    # Armar instrucciones para cada segmento
    instructions = "\n".join([
        f'"{key}": {desc}' for key, desc in prompts.items()
    ])

    prompt = f"""
You are an expert in educational analytics.

Your task is to analyze the following academic JSON report and 
return a JSON object where each key maps to a plain text explanation (1–2 paragraphs per key).

The value for each key should be a well-written explanation, not a nested object or list.

{instructions}

Respond only with a valid JSON object. Do not use Markdown, asterisks, or formatting symbols.
Respond entirely in {LANGUAGE_NAMES.get(language, "English")}.

Here is the data:
{json.dumps(summary, indent=2)}
"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": f"You are a professional academic analyst. Respond entirely in {LANGUAGE_NAMES.get(language, 'English')}."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    content = response.choices[0].message.content.strip()

    # 🔍 Limpiar si devuelve markdown
    if content.startswith("```json"):
        content = content.replace("```json", "").replace("```", "").strip()
    elif content.startswith("```"):
        content = content.replace("```", "").strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "error": "Could not parse response as JSON",
            "raw_response": content
        }
