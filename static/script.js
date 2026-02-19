function getRecommendations() {

    const userId = document.getElementById("user_id").value;

    if (!userId) {
        alert("Please enter a User ID");
        return;
    }

    fetch("/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: userId })
    })
    .then(response => response.json())
    .then(data => {

        const results = document.getElementById("results");
        results.innerHTML = "";

        if (data.recommendations.length === 0) {
            results.innerHTML = "<li>No recommendations found.</li>";
            return;
        }

        data.recommendations.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            results.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong.");
    });
}
