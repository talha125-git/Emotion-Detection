import pandas as pd

# -------------------------------
# Regression Test
# -------------------------------

REGRESSION_COLUMNS = ['text', 'emotion']

def test_regression_columns():
    """
    Regression Test:
    - Ensures train/test CSV files have expected columns
    """
    train_df = pd.read_csv("dataset/train.csv")
    test_df = pd.read_csv("dataset/test.csv")

    for col in REGRESSION_COLUMNS:
        assert col in train_df.columns
        assert col in test_df.columns
