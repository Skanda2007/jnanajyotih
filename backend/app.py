from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI", "your_mongodb_connection_string")
client = MongoClient(MONGO_URI)
db = client["sanskrit_ai"]
conversations_collection = db["conversations"]

@app.route("/api/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    # Placeholder for ML model response
    bot_response = f"You said: {user_input}"

    # Save conversation to MongoDB
    conversation = {
        "user_message": user_input,
        "bot_response": bot_response
    }
    conversations_collection.insert_one(conversation)

    return jsonify({"response": bot_response})

@app.route("/api/conversations", methods=["GET"])
def get_conversations():
    conversations = list(conversations_collection.find({}, {"_id": 0}))
    return jsonify(conversations)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)