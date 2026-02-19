from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
from utils import recommend_items

app = Flask(__name__)

# Load models
regression_model = joblib.load("models/regression.pkl")
classifier_model = joblib.load("models/classifier.pkl")

# Load scaler and feature columns
scaler = joblib.load("models/scaler.pkl")
feature_columns = joblib.load("models/feature_columns.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json(force=True)
    user_id = int(data.get("user_id"))
    recommendations = recommend_items(user_id)
    return jsonify({"recommendations": recommendations})

@app.route("/predict_rating", methods=["POST"])
def predict_rating():

    data = request.get_json(force=True)
    input_features = data.get("features")

    # Convert to numpy array
    input_array = np.array(input_features).reshape(1, -1)

    # Scale input
    input_scaled = scaler.transform(input_array)

    prediction = regression_model.predict(input_scaled)[0]

    return jsonify({"predicted_rating": round(float(prediction), 2)})

@app.route("/predict_visit_mode", methods=["POST"])
def predict_visit_mode():

    data = request.get_json(force=True)
    input_features = data.get("features")

    input_array = np.array(input_features).reshape(1, -1)

    prediction = classifier_model.predict(input_array)[0]

    return jsonify({"predicted_visit_mode": int(prediction)})

if __name__ == "__main__":
    app.run(debug=True)
