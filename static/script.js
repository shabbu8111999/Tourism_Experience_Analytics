function getRecommendations() {
    const userId = document.getElementById("user_id").value;

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

        data.recommendations.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            results.appendChild(li);
        });
    });
}
