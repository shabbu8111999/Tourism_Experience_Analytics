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

function generateRandomUser() {
    const randomId = Math.floor(Math.random() * 100) + 1;
    document.getElementById("user_id").value = randomId;
}

function getRecommendations() {
    clearResults();
    toggleLoader(true);

    fetch("/recommend", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id: getUserId() })
    })
    .then(res => res.json())
    .then(data => {
        toggleLoader(false);

        if (!data.recommendations || data.recommendations.length === 0) {
            showMessage("No recommendations available.");
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

    fetch("/predict_rating", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id: getUserId() })
    })
    .then(res => res.json())
    .then(data => {
        toggleLoader(false);

        let satisfaction;

        if (data.predicted_rating >= 4)
            satisfaction = "Highly Satisfied with the tourist destination.";
        else if (data.predicted_rating >= 3)
            satisfaction = "Moderately satisfied with the experience.";
        else
            satisfaction = "Likely dissatisfied with the tourist experience.";

        results.innerHTML =
            "<h3>Predicted Satisfaction</h3>" +
            "<p>Estimated Rating: <b>" + data.predicted_rating + "</b></p>" +
            "<p>" + satisfaction + "</p>";
    });
}

function predictVisitMode() {
    clearResults();
    toggleLoader(true);

    fetch("/predict_visit_mode", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ user_id: getUserId() })
    })
    .then(res => res.json())
    .then(data => {
        toggleLoader(false);

        results.innerHTML =
            "<h3>Predicted Travel Mode</h3>" +
            "<p>This user is most likely traveling as: <b>" +
            data.predicted_visit_mode +
            "</b></p>";
    });
}

document.getElementById("theme-toggle")
    .addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
});
