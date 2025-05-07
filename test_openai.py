from openai import OpenAI

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Set the OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set or could not be loaded.")
client = OpenAI(api_key=api_key)
# Test the API key with a simple request
try:
    response = client.chat.completions.create(model="gpt-3.5-turbo",  # Use the appropriate model
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello, how are you?"}
    ],
    max_tokens=50)
    print("API Key is working!")
    print("Response:", response.choices[0].message.content.strip())
except Exception as e:
    print("Error:", e)