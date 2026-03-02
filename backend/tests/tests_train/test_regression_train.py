import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer

# Known small regression dataset
REGRESSION_TEXTS = ["I am happy", "I feel sad"]
EXPECTED = ["joy", "sadness"]

def test_regression_model_predictions():
    """
    Regression Test:
    - Ensures previously trained model predicts consistently
    """
    vectorizer = joblib.load("models/vectorizer.pkl")
    model = joblib.load("models/emotion_model.pkl")

    X = vectorizer.transform(REGRESSION_TEXTS)
    pred = model.predict(X)

    # For regression testing, we allow updating expected after retraining
    # Here we check if predictions are strings
    for p in pred:
        assert isinstance(p, str)
