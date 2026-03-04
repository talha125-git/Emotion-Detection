# api/index.py
import json
from pathlib import Path
import re

# load your model as before...
# _load_artifacts(), clean_text(), etc.

def handler(request):
    # This is Vercel-compatible
    if request.method == "GET" and request.path in ("/api/health", "/health"):
        return {"statusCode": 200, "body": json.dumps(_health_payload()), "headers": {"Content-Type": "application/json"}}

    if request.method == "POST" and request.path in ("/api/predict", "/predict"):
        data = request.json
        text = data.get("text")
        # run your prediction logic here
        return {"statusCode": 200, "body": json.dumps({"emotion": "happy", "score": 99.9}), "headers": {"Content-Type": "application/json"}}

    return {"statusCode": 404, "body": json.dumps({"detail": "Not Found"})}