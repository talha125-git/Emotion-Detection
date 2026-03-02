import joblib

# -------------------------------
# System Test for full workflow
# -------------------------------

def test_end_to_end_training_system():
    """
    System Test:
    - Simulates full workflow: preprocessing + vectorization + trained model
    - Ensures predictions are generated correctly
    """
    model = joblib.load("models/emotion_model.pkl")
    vectorizer = joblib.load("models/vectorizer.pkl")

    # Example texts
    sample_texts = ["I am extremely happy", "I feel very sad"]

    # Transform and predict
    X = vectorizer.transform(sample_texts)
    pred = model.predict(X)

    # Ensure predictions are strings
    for p in pred:
        assert isinstance(p, str)

    # Print output for demonstration
    print("Predictions:", list(pred))
