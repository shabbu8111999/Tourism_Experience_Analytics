const loader = document.getElementById("loader");
const results = document.getElementById("results");

function toggleLoader(show) {
    loader.classList.toggle("hidden", !show);
}

function clearResults() {
    results.innerHTML = "";
}

function showMessage(message) {
    results.innerHTML = "<p>" + message + "</p>";
}

function getUserId() {
    return document.getElementById("user_id").value;
}

function getRecommendations() {

    clearResults();
    toggleLoader(true);

    const userId = getUserId();

    fetch("/recommend", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {
        toggleLoader(false);

        if (!data.recommendations || data.recommendations.length === 0) {
            showMessage("No recommendations found.");
            return;
        }

        let html = "<h3>Recommended Attractions</h3><ul>";
        data.recommendations.forEach(item => {
            html += "<li>" + item + "</li>";
        });
        html += "</ul>";

        results.innerHTML = html;
    });
}

function predictRating() {

    clearResults();
    toggleLoader(true);

    const userId = getUserId();

    fetch("/predict_rating", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {
        toggleLoader(false);

        if (data.error) {
            showMessage(data.error);
            return;
        }

        results.innerHTML =
            "<h3>Predicted Rating</h3>" +
            "<p>The system estimates this user's expected experience rating as <b>" +
            data.predicted_rating +
            "</b> based on historical behavior patterns.</p>";
    });
}

function predictVisitMode() {

    clearResults();
    toggleLoader(true);

    const userId = getUserId();

    fetch("/predict_visit_mode", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {
        toggleLoader(false);

        if (data.error) {
            showMessage(data.error);
            return;
        }

        results.innerHTML =
            "<h3>Predicted Visit Mode</h3>" +
            "<p>The model predicts that this user is most likely traveling as <b>" +
            data.predicted_visit_mode +
            "</b> based on behavioral and regional patterns.</p>";
    });
}

/* Dark Mode Toggle */
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
