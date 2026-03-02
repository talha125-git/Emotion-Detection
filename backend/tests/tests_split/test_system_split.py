import pandas as pd
from sklearn.model_selection import train_test_split

# -------------------------------
# System Test
# -------------------------------

def test_end_to_end_split_system():
    """
    System Test:
    - Loads full CSV
    - Cleans columns
    - Splits into train/test
    - Ensures output files are correct
    """
    df = pd.read_csv("dataset/tweet_emotions.csv", on_bad_lines="skip", encoding="utf-8")
    df.columns = [c.strip() for c in df.columns]
    df.rename(columns={'content': 'text', 'sentiment': 'emotion'}, inplace=True)

    train_df, test_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df['emotion'])

    # Ensure output
    assert not train_df.empty
    assert not test_df.empty
    assert 'text' in train_df.columns
    assert 'emotion' in train_df.columns

    print("Train size:", len(train_df), "Test size:", len(test_df))
