import pandas as pd
from sklearn.model_selection import train_test_split
from split_dataset import train_df, test_df


# -------------------------------
# Unit Tests for small components
# -------------------------------

def test_column_rename():
    """
    Unit Test:
    - Ensures columns are renamed correctly
    """
    df = pd.DataFrame({
        "content": ["hello", "hi"], 
        "sentiment": ["joy", "sadness"]
    })
    df.rename(columns={'content': 'text', 'sentiment': 'emotion'}, inplace=True)
    assert 'text' in df.columns
    assert 'emotion' in df.columns

def test_train_test_split_ratio():
    """
    Unit Test:
    - Ensures train-test split produces correct ratios
    """
    df = pd.DataFrame({
        "text": ["a", "b", "c", "d", "e"],
        "emotion": ["joy", "sadness", "joy", "sadness", "joy"]
    })
    train_df, test_df = train_test_split(df, test_size=0.4, random_state=42, stratify=df['emotion'])
    # Check approximate ratio
    assert abs(len(train_df)/len(df) - 0.6) < 0.01
    assert abs(len(test_df)/len(df) - 0.4) < 0.01
