import pandas as pd                               # For reading and handling CSV files
from sklearn.model_selection import train_test_split  # For splitting dataset


# Load original dataset (skip corrupted rows)
df = pd.read_csv(
    "dataset/tweet_emotions.csv",
    on_bad_lines="skip",     # Skip broken rows
    encoding="utf-8"         # Support special characters & emojis
)


# Remove extra spaces from column names
df.columns = [c.strip() for c in df.columns]


# Rename columns to match project format
df.rename(
    columns={
        'content': 'text',
        'sentiment': 'emotion'
    },
    inplace=True
)


# Verify columns and emotion distribution
print(df.columns)
print(df['emotion'].value_counts())


# Split dataset into training (80%) and testing (20%)
train_df, test_df = train_test_split(
    df,
    test_size=0.2,           # 20% test data
    random_state=42,         # Reproducible results
    stratify=df['emotion']   # Keep emotion balance
)


# Save train and test datasets
train_df.to_csv("dataset/train.csv", index=False)
test_df.to_csv("dataset/test.csv", index=False)

print("✅ Train and Test CSV files created!")
