import time
import joblib

def test_model_inference_speed():
    """
    Performance Test:
    - Ensures model predicts quickly on batch input
    """
    model = joblib.load("models/emotion_model.pkl")
    vectorizer = joblib.load("models/vectorizer.pkl")

    sample_texts = ["I am happy"]*1000  # large batch
    X = vectorizer.transform(sample_texts)

    start = time.time()
    pred = model.predict(X)
    end = time.time()

    response_time = end - start
    assert response_time < 2, f"Too slow: {response_time}s"
