import re

def clean_text(text):
    """
    - Lowercase text
    - Remove URLs
    - Remove punctuation / numbers
    - Remove extra spaces
    """
    text = text.lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text
