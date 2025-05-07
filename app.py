from openai import OpenAI
import os
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

# Set the OpenAI API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)

@app.route('/templates/index.html')
def index():
    return render_template('index.html')

@app.route('/templates/page2.html')
def page2():
    return render_template('page2.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt', '')  # Get prompt from frontend request
    try:
        response = client.chat.completions.create(model="gpt-4o-mini",  # Use the correct model name
        messages=[{"role": "user", "content": prompt}])
        return jsonify({"response": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host='127.0.0.1', port=5500)