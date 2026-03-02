import time
from fastapi.testclient import TestClient
from app import app


# Create FastAPI test client
client = TestClient(app)

def test_predict_performance():
    """
    Performance Testing:
    - Measures the time it takes for the API to respond
    - Ensures model inference is fast enough for real use
    """

    # Example input text
    test_text = "I am extremely happy and excited today!"

    # Start timer
    start_time = time.time()

    # Send POST request to the prediction API
    response = client.post("/predict", json={"text": test_text})

    # End timer
    end_time = time.time()

    # Check API responded successfully
    assert response.status_code == 200

    # Optional: validate response structure
    data = response.json()
    assert "emotion" in data
    assert "score" in data

    # Measure response time (in seconds)
    response_time = end_time - start_time

    # Assert that API responds in under 1 second (adjust as needed)
    assert response_time < 1, f"Performance too slow: {response_time} seconds"

    # Print response time for information
    print(f"API response time: {response_time:.3f} seconds")
