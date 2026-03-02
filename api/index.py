from pathlib import Path
import re
from typing import Optional

import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


MODEL_FILENAME = "emotion_model.pkl"
VECTORIZER_FILENAME = "vectorizer.pkl"

_model = None
_vectorizer = None
_load_error = None
_resolved_model_dir = None


def _resolve_model_dir() -> Optional[Path]:
    file_path = Path(__file__).resolve()
    search_roots = [file_path.parent, *file_path.parents, Path.cwd()]

    for root in search_roots:
        for candidate in (root / "backend" / "models", root / "models"):
            if (candidate / MODEL_FILENAME).exists() and (
                candidate / VECTORIZER_FILENAME
            ).exists():
                return candidate
    return None


def _load_artifacts():
    global _model, _vectorizer, _load_error, _resolved_model_dir

    if _model is not None and _vectorizer is not None:
        return _model, _vectorizer
    if _load_error:
        raise RuntimeError(_load_error)

    model_dir = _resolve_model_dir()
    _resolved_model_dir = model_dir

    if model_dir is None:
        _load_error = (
            f"Could not locate {MODEL_FILENAME} and {VECTORIZER_FILENAME} in deployment."
        )
        raise RuntimeError(_load_error)

    try:
        _model = joblib.load(model_dir / MODEL_FILENAME)
        _vectorizer = joblib.load(model_dir / VECTORIZER_FILENAME)
    except Exception as exc:
        _load_error = f"{type(exc).__name__}: {exc}"
        raise RuntimeError(_load_error) from exc

    return _model, _vectorizer


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
@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": _model is not None and _vectorizer is not None,
        "model_dir": str(_resolved_model_dir) if _resolved_model_dir else None,
        "load_error": _load_error,
    }


@app.post("/predict")
@app.post("/api/predict")
def predict_emotion(request: TextRequest):
    try:
        model, vectorizer = _load_artifacts()
        text = clean_text(request.text)
        vec = vectorizer.transform([text])
        pred = model.predict(vec)[0]
        prob = model.predict_proba(vec).max()
        return {"emotion": pred, "score": round(prob * 100, 2)}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
