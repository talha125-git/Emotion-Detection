from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_integration_predict_emotion():
    """
    Integration Test:
    Checks full flow:
    request → preprocessing → vectorizer → model → response
    """

    response = client.post(
        "/predict",
        json={"text": "I am feeling very happy today"}
    )

    assert response.status_code == 200

    data = response.json()

    # Validate response structure
    assert "emotion" in data
    assert "score" in data

    # Validate data types
    assert isinstance(data["emotion"], str)
    assert isinstance(data["score"], float)

    # Validate probability range
    assert 0 <= data["score"] <= 100
