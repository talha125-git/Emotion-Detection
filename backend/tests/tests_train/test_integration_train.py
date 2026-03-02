import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from preprocess import clean_text

def test_training_pipeline_integration():
    """
    Integration Test:
    - Tests end-to-end training pipeline: preprocessing + vectorizer + model
    """
    # Sample dataset
    df = pd.DataFrame({
        "text": ["I am happy", "I feel sad"],
        "emotion": ["joy", "sadness"]
    })

    # Preprocess
    df['text'] = df['text'].apply(clean_text)

    # Vectorize
    vectorizer = TfidfVectorizer(max_features=10)
    X = vectorizer.fit_transform(df['text'])
    y = df['emotion']

    # Train model
    model = LogisticRegression(max_iter=50)
    model.fit(X, y)

    # Check predictions
    pred = model.predict(X)
    assert all([p in y.tolist() for p in pred])
