from openai import OpenAI
from system_prompt import SYSTEM_PROMPT
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def ask_jnanajyotih(user_input: str, skill_score: int) -> str:
    depth_hint = (
        "Use simple explanations."
        if skill_score < 40
        else "Use moderate grammatical terminology."
        if skill_score < 70
        else "Use precise grammatical terminology and optional rule references."
    )

    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": f"User proficiency hint: {depth_hint}"},
            {"role": "user", "content": user_input},
        ],
        temperature=0.3,
    )

    return response.choices[0].message.content
