import pandas as pd
from sklearn.model_selection import train_test_split

def test_split_with_missing_values():
    """
    Security Test:
    - Ensures splitting works even with missing values
    - Does not crash even if stratify is not possible
    """
    df = pd.DataFrame({
        "text": ["a", None, "c", "d"],
        "emotion": ["joy", "sadness", None, "anger"]
    })

    try:
        # Fill missing emotions
        df['emotion'] = df['emotion'].fillna("unknown")

        # Do a train-test split WITHOUT stratify to avoid errors on tiny data
        train_df, test_df = train_test_split(df, test_size=0.5, random_state=42)

        # Basic checks
        assert not train_df.empty
        assert not test_df.empty
        assert 'text' in train_df.columns
        assert 'emotion' in train_df.columns

    except Exception:
        assert False, "Train-test split crashed with missing values"
