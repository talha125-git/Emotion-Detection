import time
import pandas as pd
from sklearn.model_selection import train_test_split

# -------------------------------
# Performance Test
# -------------------------------

def test_split_performance():
    """
    Performance Test:
    - Measures time to split a large dataset
    - Ensures it completes under 2 seconds
    """
    df = pd.DataFrame({
        "text": ["sample text"]*10000,
        "emotion": ["joy"]*5000 + ["sadness"]*5000
    })

    start = time.time()
    train_df, test_df = train_test_split(df, test_size=0.2, random_state=42, stratify=df['emotion'])
    end = time.time()

    elapsed = end - start
    assert elapsed < 2, f"Splitting too slow: {elapsed} seconds"
