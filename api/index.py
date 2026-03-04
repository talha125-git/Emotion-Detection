import json
import re
from pathlib import Path

MODEL_FILENAME = "emotion_model.pkl"
VECTORIZER_FILENAME = "vectorizer.pkl"

_model = None
_vectorizer = None
_load_error = None
_resolved_model_dir = None

# -----------------------------
# Utility functions
# -----------------------------
def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def _candidate_model_dirs():
    file_path = Path(__file__).resolve()
    roots = [file_path.parent] + list(file_path.parents) + [Path.cwd()]
    seen = set()
    for root in roots:
        for candidate in (root / "backend" / "models", root / "models"):
            resolved = str(candidate.resolve())
            if resolved in seen:
                continue
            seen.add(resolved)
            if candidate.exists():
                yield candidate

def _resolve_model_dir():
    for candidate in _candidate_model_dirs():
        if (candidate / MODEL_FILENAME).exists() and (candidate / VECTORIZER_FILENAME).exists():
            return candidate
    return None

def _load_artifacts():
    global _model, _vectorizer, _load_error, _resolved_model_dir

    if _model and _vectorizer:
        return _model, _vectorizer
    if _load_error:
        raise RuntimeError(_load_error)

    model_dir = _resolve_model_dir()
    _resolved_model_dir = model_dir
    if model_dir is None:
        _load_error = "Could not locate emotion_model.pkl and vectorizer.pkl in deployment."
        raise RuntimeError(_load_error)

    try:
        import joblib
    except Exception as exc:
        _load_error = f"Dependency import error: {type(exc).__name__}: {exc}"
        raise RuntimeError(_load_error) from exc

    try:
        _model = joblib.load(model_dir / MODEL_FILENAME)
        _vectorizer = joblib.load(model_dir / VECTORIZER_FILENAME)
    except Exception as exc:
        _load_error = f"Artifact load error: {type(exc).__name__}: {exc}"
        raise RuntimeError(_load_error) from exc

    return _model, _vectorizer

def _health_payload():
    detected_model_dir = _resolve_model_dir()
    return {
        "status": "ok",
        "model_loaded": _model is not None and _vectorizer is not None,
        "model_dir": str(_resolved_model_dir or detected_model_dir)
        if (_resolved_model_dir or detected_model_dir)
        else None,
        "model_files_present": detected_model_dir is not None,
        "load_error": _load_error,
    }

# -----------------------------
# Vercel-compatible handler
# -----------------------------
def handler(request):
    method = request.method
    path = request.path

    # Health check
    if method == "GET" and path in ("/api/health", "/health"):
        return {"statusCode": 200, "body": json.dumps(_health_payload()), "headers": {"Content-Type": "application/json"}}

    # Prediction
    if method == "POST" and path in ("/api/predict", "/predict"):
        try:
            payload = request.json
        except Exception as exc:
            return {"statusCode": 400, "body": json.dumps({"detail": f"Invalid JSON: {exc}"})}

        text = payload.get("text") if isinstance(payload, dict) else None
        if not isinstance(text, str) or not text.strip():
            return {"statusCode": 400, "body": json.dumps({"detail": "Field 'text' is required."})}

        try:
            model, vectorizer = _load_artifacts()
            cleaned = clean_text(text)
            vec = vectorizer.transform([cleaned])
            pred = model.predict(vec)[0]
            prob = float(model.predict_proba(vec).max())
            return {"statusCode": 200, "body": json.dumps({"emotion": str(pred), "score": round(prob * 100, 2)}), "headers": {"Content-Type": "application/json"}}
        except Exception as exc:
            return {"statusCode": 500, "body": json.dumps({"detail": str(exc)})}

    # CORS
    if method == "OPTIONS":
        return {"statusCode": 200, "body": json.dumps({"ok": True}), "headers": {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type"}}

    return {"statusCode": 404, "body": json.dumps({"detail": "Not Found"})}