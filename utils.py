import joblib
import pandas as pd

# Load saved matrices
item_similarity_df = joblib.load("models/item_similarity.pkl")
user_item_matrix = joblib.load("models/user_item_matrix.pkl")

def recommend_items(user_id, top_n=5):

    if user_id not in user_item_matrix.index:
        return []

    user_ratings = user_item_matrix.loc[user_id]
    rated_items = user_ratings[user_ratings.notna()]

    recommendation_scores = pd.Series(dtype=float)

    for item in rated_items.index:
        similar_items = item_similarity_df[item]
        weighted_scores = similar_items * rated_items[item]
        recommendation_scores = recommendation_scores.add(
            weighted_scores, fill_value=0
        )

    recommendation_scores = recommendation_scores.drop(rated_items.index)

    top_recommendations = recommendation_scores.sort_values(
        ascending=False
    ).head(top_n)

    return list(top_recommendations.index)
