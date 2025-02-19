import openai
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt', '')  # Get prompt from frontend request
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Or "gpt-4-turbo" if needed
            messages=[{"role": "user", "content": prompt}]
        )
        return jsonify({"response": response.choices[0].message["content"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add the following block
if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5500)  # This ensures it runs on port 5001