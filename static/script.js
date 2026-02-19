function getUserId() {
    return document.getElementById("user_id").value;
}

function clearResults() {
    document.getElementById("results").innerHTML = "";
}

function getRecommendations() {

    clearResults();
    const userId = getUserId();

    fetch("/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {
        const results = document.getElementById("results");
        data.recommendations.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            results.appendChild(li);
        });
    });
}

function predictRating() {

    clearResults();
    const userId = getUserId();

    fetch("/predict_rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {
        const results = document.getElementById("results");
        const li = document.createElement("li");
        li.textContent = "Predicted Rating: " + data.predicted_rating;
        results.appendChild(li);
    });
}

function predictVisitMode() {

    clearResults();
    const userId = getUserId();

    fetch("/predict_visit_mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {
        const results = document.getElementById("results");
        const li = document.createElement("li");
        li.textContent = "Predicted Visit Mode: " + data.predicted_visit_mode;
        results.appendChild(li);
    });
}
