from fastapi.testclient import TestClient
from app import app

# Create FastAPI test client
client = TestClient(app)

def test_security_invalid_input():
    """
    Security Testing:
    - Checks how API handles invalid, missing, or extreme inputs
    - Ensures it does not crash and returns proper error codes
    """

    # 1️⃣ Missing "text" key in JSON
    response = client.post("/predict", json={})
    # FastAPI should return 422 Unprocessable Entity
    assert response.status_code == 422

    # 2️⃣ Non-string input
    response = client.post("/predict", json={"text": 12345})
    assert response.status_code == 422

    # 3️⃣ Very large input text
    large_text = "A" * 100000  # 100k characters
    response = client.post("/predict", json={"text": large_text})
    # Should respond successfully, not crash
    assert response.status_code == 200
    data = response.json()
    assert "emotion" in data
    assert "score" in data

    # 4️⃣ Empty string input
    response = client.post("/predict", json={"text": ""})
    assert response.status_code == 200
    data = response.json()
    assert "emotion" in data
    assert "score" in data
