from fastapi.testclient import TestClient
from app import app

# Create a test client for FastAPI app
client = TestClient(app)

# These inputs are known to give correct results earlier
# If the model or code changes, these outputs should NOT change
REGRESSION_CASES = [
    {"text": "I am very happy today", "expected_emotion": "happiness"},
    {"text": "I feel sad and depressed", "expected_emotion": "sadness"},
]


def test_regression_emotion_predictions():
    """
    Regression Testing:
    - Sends old, known input texts to the API
    - Checks if the predicted emotion is still the same
    - Ensures new changes do not break existing functionality
    """

    for case in REGRESSION_CASES:
        # Send POST request to prediction API
        response = client.post(
            "/predict",
            json={"text": case["text"]}
        )

        # Check API is working correctly
        assert response.status_code == 200

        # Convert response to JSON
        data = response.json()

        # Verify emotion has not changed
        assert data["emotion"] == case["expected_emotion"]
