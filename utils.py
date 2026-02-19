import joblib
import pandas as pd

# Load matrices
item_similarity_df = joblib.load("models/item_similarity.pkl")
user_item_matrix = joblib.load("models/user_item_matrix.pkl")

# Load attraction mapping
attraction_map = joblib.load("models/attraction_map.pkl")

def recommend_items(user_id, top_n=5):

    if user_id not in user_item_matrix.index:
        return []

    user_ratings = user_item_matrix.loc[user_id]
    rated_items = user_ratings[user_ratings.notna()]

    recommendation_scores = pd.Series(dtype=float)
    similarity_sums = pd.Series(dtype=float)

    for item in rated_items.index:

        similar_items = item_similarity_df[item]

        weighted_scores = similar_items * rated_items[item]

        recommendation_scores = recommendation_scores.add(
            weighted_scores, fill_value=0
        )

        similarity_sums = similarity_sums.add(
            similar_items.abs(), fill_value=0
        )

    recommendation_scores = recommendation_scores / similarity_sums

    recommendation_scores = recommendation_scores.drop(rated_items.index)
    recommendation_scores = recommendation_scores.dropna()

    top_recommendations = recommendation_scores.sort_values(
        ascending=False
    ).head(top_n)

    rec_df = pd.DataFrame({
        "AttractionId": top_recommendations.index
    })

    rec_df = rec_df.merge(attraction_map, on="AttractionId", how="left")

    return rec_df["Attraction"].tolist()
