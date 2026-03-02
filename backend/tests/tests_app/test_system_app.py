from fastapi.testclient import TestClient
from app import app

# Create FastAPI test client
client = TestClient(app)

def test_system_end_to_end():
    """
    System Testing:
    - Tests full system workflow from input text to output prediction
    - Simulates real-world scenario
    """

    # Example input texts simulating user input
    test_cases = [
        "I am so excited about this project!",
        "I feel very sad and lonely today.",
        "I am angry because things are not working."
    ]

    for text in test_cases:
        # Send POST request to API
        response = client.post("/predict", json={"text": text})

        # Check that API responds correctly
        assert response.status_code == 200

        data = response.json()

        # Validate response structure
        assert "emotion" in data
        assert "score" in data
        assert isinstance(data["emotion"], str)
        assert isinstance(data["score"], float)
        assert 0 <= data["score"] <= 100

        # Print output for demonstration
        print(f"Input: {text} → Predicted: {data['emotion']} ({data['score']}%)")
