from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from grammar_engine import check_sanskrit_sentence

app = FastAPI(title="Jñānajyotiḥ AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "Jñānajyotiḥ backend running"}


@app.post("/check_sentence")
async def check_sentence(payload: dict):
    sentence = payload.get("sentence", "")
    return check_sanskrit_sentence(sentence)
