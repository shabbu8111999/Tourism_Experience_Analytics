from flask import Flask, render_template, request, jsonify
import joblib
from utils import recommend_items

app = Flask(__name__)

regression_model = joblib.load("models/regression.pkl")
classifier_model = joblib.load("models/classifier.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    user_id = int(data["user_id"])
    recommendations = recommend_items(user_id)
    return jsonify({"recommendations": recommendations})

if __name__ == "__main__":
    app.run(debug=True)
