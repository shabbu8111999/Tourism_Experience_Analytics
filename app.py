from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import pandas as pd
from utils import recommend_items

app = Flask(__name__)

# Load models
regression_model = joblib.load("models/regression.pkl")
classifier_model = joblib.load("models/classifier.pkl")

# Load scaler and feature info
scaler = joblib.load("models/scaler.pkl")
feature_columns = joblib.load("models/feature_columns.pkl")

# Load full model dataset
model_data = joblib.load("models/model_data.pkl")

@app.route("/")
def home():
    return render_template("index.html")

# ---------------- Recommendation ----------------
@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json(force=True)
    user_id = int(data.get("user_id"))
    recommendations = recommend_items(user_id)
    return jsonify({"recommendations": recommendations})

# ---------------- Rating Prediction ----------------
@app.route("/predict_rating", methods=["POST"])
def predict_rating():

    data = request.get_json(force=True)
    user_id = int(data.get("user_id"))

    if user_id not in model_data["UserId"].unique():
        return jsonify({"error": "User not found"})

    user_row = model_data[model_data["UserId"] == user_id].iloc[[0]]

    X_user = user_row[feature_columns]

    X_scaled = scaler.transform(X_user)

    prediction = regression_model.predict(X_scaled)[0]

    # Clip prediction between 1 and 5
    prediction = max(1, min(5, prediction))

    return jsonify({"predicted_rating": round(float(prediction), 2)})

# ---------------- Visit Mode Prediction ----------------
visit_mode_map = {
    0: "Solo",
    1: "Family",
    2: "Friends",
    3: "Couple",
    4: "Business"
}
@app.route("/predict_visit_mode", methods=["POST"])
def predict_visit_mode():

    data = request.get_json(force=True)
    user_id = int(data.get("user_id"))

    if user_id not in model_data["UserId"].values:
        return jsonify({"error": "User not found"})

    user_row = model_data[model_data["UserId"] == user_id]

    X_user = user_row[feature_columns]

    prediction = classifier_model.predict(X_user)[0]
    visit_mode_label = visit_mode_map.get(int(prediction), "Unknown")

    return jsonify({"predicted_visit_mode": visit_mode_label})

if __name__ == "__main__":
    app.run(debug=True)
