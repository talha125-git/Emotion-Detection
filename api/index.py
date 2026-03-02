import json
import re
import sys
from http.server import BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse


MODEL_FILENAME = "emotion_model.pkl"
VECTORIZER_FILENAME = "vectorizer.pkl"

_model = None
_vectorizer = None
_load_error = None
_resolved_model_dir = None


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
            yield candidate


def _resolve_model_dir():
    for candidate in _candidate_model_dirs():
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
            "Could not locate emotion_model.pkl and vectorizer.pkl in deployment."
        )
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
        "python": sys.version.split()[0],
        "model_loaded": _model is not None and _vectorizer is not None,
        "model_dir": str(_resolved_model_dir or detected_model_dir)
        if (_resolved_model_dir or detected_model_dir)
        else None,
        "model_files_present": detected_model_dir is not None,
        "load_error": _load_error,
    }


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def _path(self):
        return urlparse(self.path).path

    def do_OPTIONS(self):
        self._send_json(200, {"ok": True})

    def do_GET(self):
        path = self._path()
        if path in ("/health", "/api/health"):
            self._send_json(200, _health_payload())
            return
        self._send_json(404, {"detail": "Not Found"})

    def do_POST(self):
        path = self._path()
        if path not in ("/predict", "/api/predict"):
            self._send_json(404, {"detail": "Not Found"})
            return

        content_length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(content_length) if content_length > 0 else b"{}"

        try:
            payload = json.loads(raw.decode("utf-8"))
        except Exception as exc:
            self._send_json(400, {"detail": f"Invalid JSON body: {exc}"})
            return

        text = payload.get("text") if isinstance(payload, dict) else None
        if not isinstance(text, str) or not text.strip():
            self._send_json(400, {"detail": "Field 'text' is required."})
            return

        try:
            model, vectorizer = _load_artifacts()
            cleaned = clean_text(text)
            vec = vectorizer.transform([cleaned])
            pred = model.predict(vec)[0]
            prob = float(model.predict_proba(vec).max())
            self._send_json(200, {"emotion": str(pred), "score": round(prob * 100, 2)})
        except Exception as exc:
            self._send_json(500, {"detail": str(exc)})
