import pandas as pd                                  # For handling CSV files
from sklearn.feature_extraction.text import TfidfVectorizer  # Text → numbers
from sklearn.linear_model import LogisticRegression  # ML classification model
from sklearn.metrics import classification_report    # Model evaluation
import joblib                                       # Save/load models
from preprocess import clean_text                   # Text cleaning function


# Load training and testing datasets
train_df = pd.read_csv("dataset/train.csv")
test_df = pd.read_csv("dataset/test.csv")


# Clean text data
train_df['text'] = train_df['text'].apply(clean_text)
test_df['text'] = test_df['text'].apply(clean_text)


# Create TF-IDF vectorizer (max 5000 words)
vectorizer = TfidfVectorizer(max_features=5000)

# Convert text into numerical vectors
X_train = vectorizer.fit_transform(train_df['text'])
X_test = vectorizer.transform(test_df['text'])


# Get emotion labels
y_train = train_df['emotion']
y_test = test_df['emotion']


# Create Logistic Regression model
model = LogisticRegression(max_iter=500)

# Train the model
model.fit(X_train, y_train)


# Predict emotions on test data
y_pred = model.predict(X_test)

# Print model performance
print(classification_report(y_test, y_pred))


# Save trained model and vectorizer
joblib.dump(model, "models/emotion_model.pkl")
joblib.dump(vectorizer, "models/vectorizer.pkl")

print("✅ Model trained and saved!")
