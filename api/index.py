from pathlib import Path
import re

import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


ROOT_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = ROOT_DIR / "backend" / "models"

if not MODEL_DIR.exists():
    raise RuntimeError(f"Model directory not found: {MODEL_DIR}")

MODEL_PATH = MODEL_DIR / "emotion_model.pkl"
VECTORIZER_PATH = MODEL_DIR / "vectorizer.pkl"

if not MODEL_PATH.exists():
    raise RuntimeError(f"Model file not found: {MODEL_PATH}")
if not VECTORIZER_PATH.exists():
    raise RuntimeError(f"Vectorizer file not found: {VECTORIZER_PATH}")

# Load trained artifacts once on cold start.
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

app = FastAPI(title="Emotion Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextRequest(BaseModel):
    text: str


def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/predict")
@app.post("/api/predict")
def predict_emotion(request: TextRequest):
    text = clean_text(request.text)
    vec = vectorizer.transform([text])
    pred = model.predict(vec)[0]
    prob = model.predict_proba(vec).max()
    return {"emotion": pred, "score": round(prob * 100, 2)}
