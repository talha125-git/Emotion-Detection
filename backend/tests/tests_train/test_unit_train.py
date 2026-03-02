import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from preprocess import clean_text

def test_clean_text_function():
    """
    Unit Test:
    - Ensures the preprocess.clean_text function works correctly
    """
    raw_text = "I am VERY happy!!"
    cleaned = clean_text(raw_text)
    assert isinstance(cleaned, str)
    assert "very" in cleaned.lower()
    assert "!!" not in cleaned

def test_vectorizer_fit():
    """
    Unit Test:
    - Ensure vectorizer can fit on sample data
    """
    sample_texts = ["happy day", "sad night"]
    vectorizer = TfidfVectorizer(max_features=10)
    X = vectorizer.fit_transform(sample_texts)
    assert X.shape[0] == 2
    assert X.shape[1] <= 10

def test_model_training():
    """
    Unit Test:
    - Ensure LogisticRegression can train on small sample
    """
    X = [[0,1],[1,0]]
    y = ["joy", "sadness"]
    model = LogisticRegression(max_iter=10)
    model.fit(X, y)
    assert model.predict([[0,1]])[0] in y
