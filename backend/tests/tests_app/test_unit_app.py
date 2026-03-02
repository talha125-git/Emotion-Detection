from fastapi.testclient import TestClient
from app import app

# Create a test client for the FastAPI app
client = TestClient(app)

def test_predict_emotion_success():
    # Send a valid text input to the /predict endpoint
    response = client.post(
        "/predict",
        json={"text": "I am very happy today"}
    )
    
    # Check if request was successful
    assert response.status_code == 200
    
    # Check required keys exist in response
    assert "emotion" in response.json()
    assert "score" in response.json()

def test_predict_emotion_empty_text():
    # Send an empty text input
    response = client.post(
        "/predict",
        json={"text": ""}
    )
    
    # API should still respond successfully
    assert response.status_code == 200

def test_predict_emotion_invalid_body():
    # Send an invalid request body (missing 'text')
    response = client.post(
        "/predict",
        json={}
    )
    
    # FastAPI should return validation error
    assert response.status_code == 422
