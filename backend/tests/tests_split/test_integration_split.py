import pandas as pd
from sklearn.model_selection import train_test_split

def test_split_pipeline_integration():
    """
    Integration Test:
    - Loads a small dataset
    - Renames columns
    - Splits into train/test
    - Ensures everything works together
    """
    df = pd.DataFrame({
        "content": [
            "I am happy", "I am excited",  # joy
            "I feel sad", "I feel lonely", # sadness
            "I am angry", "I am furious"   # anger
        ],
        "sentiment": [
            "joy", "joy",
            "sadness", "sadness",
            "anger", "anger"
        ]
    })

    # Step 1: Rename
    df.rename(columns={'content': 'text', 'sentiment': 'emotion'}, inplace=True)

    # Step 2: Split
    train_df, test_df = train_test_split(
        df, test_size=0.5, random_state=42, stratify=df['emotion']
    )

    # Step 3: Check output
    assert len(train_df) == 3
    assert len(test_df) == 3
    assert 'text' in train_df.columns
    assert 'emotion' in train_df.columns
