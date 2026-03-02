import joblib

def test_model_with_invalid_input():
    """
    Security Test:
    - Ensures model does not crash on invalid input
    - Converts non-string inputs to string
    """
    model = joblib.load("models/emotion_model.pkl")
    vectorizer = joblib.load("models/vectorizer.pkl")

    # Numeric input (invalid), convert to string
    try:
        X = vectorizer.transform([str(12345)])
        pred = model.predict(X)
        assert True  # model did not crash
    except Exception:
        assert False, "Model crashed on numeric input"

    # Empty string input
    try:
        X = vectorizer.transform([""])
        pred = model.predict(X)
        assert True
    except Exception:
        assert False, "Model crashed on empty string input"
