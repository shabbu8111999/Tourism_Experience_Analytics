function getUserId() {
    return document.getElementById("user_id").value;
}

function clearResults() {
    const results = document.getElementById("results");
    results.innerHTML = "";
}

function showMessage(message) {
    const results = document.getElementById("results");
    results.innerHTML = "<p>" + message + "</p>";
}

function getRecommendations() {

    clearResults();
    const userId = getUserId();

    if (!userId) {
        showMessage("Please enter a User ID.");
        return;
    }

    fetch("/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {

        const results = document.getElementById("results");

        if (!data.recommendations || data.recommendations.length === 0) {
            showMessage("No recommendations found.");
            return;
        }

        const ul = document.createElement("ul");

        data.recommendations.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
        });

        results.appendChild(ul);
    })
    .catch(() => {
        showMessage("Error retrieving recommendations.");
    });
}

function predictRating() {

    clearResults();
    const userId = getUserId();

    if (!userId) {
        showMessage("Please enter a User ID.");
        return;
    }

    fetch("/predict_rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {

        if (data.error) {
            showMessage(data.error);
            return;
        }

        showMessage("Predicted Rating: " + data.predicted_rating);
    })
    .catch(() => {
        showMessage("Error predicting rating.");
    });
}

function predictVisitMode() {

    clearResults();
    const userId = getUserId();

    if (!userId) {
        showMessage("Please enter a User ID.");
        return;
    }

    fetch("/predict_visit_mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {

        if (data.error) {
            showMessage(data.error);
            return;
        }

        showMessage("Predicted Visit Mode: " + data.predicted_visit_mode);
    })
    .catch(() => {
        showMessage("Error predicting visit mode.");
    });
}
