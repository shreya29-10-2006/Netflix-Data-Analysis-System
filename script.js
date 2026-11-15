
// Load dashboard summary
async function loadNetflixData() {

    try {

        const response = await fetch("/api/summary");
        const data = await response.json();

        document.getElementById("totalTitles").textContent =
            data.total_titles.toLocaleString();

        document.getElementById("totalMovies").textContent =
            data.total_movies.toLocaleString();

        document.getElementById("totalShows").textContent =
            data.total_tv_shows.toLocaleString();

        document.getElementById("totalCountries").textContent =
            data.total_countries.toLocaleString();

        console.log("Netflix data loaded successfully!");

    } catch (error) {

        console.error("Data loading error:", error);

    }
}


// Create charts
async function createChart(
    url,
    canvasId,
    chartType,
    label,
    horizontal = false
) {

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load chart data: " + url);
        }

        const data = await response.json();

        new Chart(document.getElementById(canvasId), {

            type: chartType,

            data: {

                labels: data.labels,

                datasets: [{

                    label: label,
                    data: data.values,

                    backgroundColor: [
                        "#e50914",
                        "#f5c518",
                        "#2196f3",
                        "#4caf50",
                        "#9c27b0",
                        "#ff9800",
                        "#00bcd4",
                        "#795548",
                        "#607d8b",
                        "#e91e63"
                    ],

                    borderWidth: 1

                }]

            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                indexAxis: horizontal ? "y" : "x",

                plugins: {

                    legend: {

                        labels: {
                            color: "#ffffff"
                        }

                    }

                },

                scales: chartType === "pie" ? {} : {

                    x: {
                        ticks: { color: "#dddddd" },
                        grid: { color: "#444444" }
                    },

                    y: {
                        ticks: { color: "#dddddd" },
                        grid: { color: "#444444" }
                    }

                }

            }

        });

    } catch (error) {

        console.error(error);

    }

}


// Search Netflix titles
async function searchNetflix() {

    const input = document.getElementById("searchInput");
    const query = input.value.trim();

    const resultsContainer =
        document.getElementById("searchResults");

    if (!query) {
        resultsContainer.innerHTML =
            '<p class="no-results">Please enter a movie or TV show name.</p>';
        return;
    }

    resultsContainer.innerHTML =
        '<p class="no-results">Searching...</p>';

    try {

        const response = await fetch(
            "/api/search?q=" + encodeURIComponent(query)
        );

        if (!response.ok) {
            throw new Error("Search request failed");
        }

        const results = await response.json();

        if (results.length === 0) {

            resultsContainer.innerHTML =
                '<p class="no-results">No titles found. Try another name.</p>';

            return;

        }

        resultsContainer.innerHTML = "";

        results.forEach(movie => {

            const card = document.createElement("div");
            card.className = "result-card";

            const title = document.createElement("h3");
            title.textContent = movie.title;

            const details = document.createElement("p");
            details.textContent =
                movie.type + " | " +
                movie.release_year + " | Rating: " +
                (movie.rating || "Not available");

            const genre = document.createElement("p");
            genre.textContent = "Genre: " +
                (movie.listed_in || "Not available");

            const description = document.createElement("p");
            description.textContent =
                movie.description || "Description not available.";

            card.appendChild(title);
            card.appendChild(details);
            card.appendChild(genre);
            card.appendChild(description);

            resultsContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Search error:", error);

        resultsContainer.innerHTML =
            '<p class="no-results">Something went wrong. Please try again.</p>';

    }

}


// Search when Enter is pressed
document.getElementById("searchInput").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            searchNetflix();
        }

    }
);


// Load all dashboard features
loadNetflixData();

createChart(
    "/api/type-data",
    "typeChart",
    "pie",
    "Number of Titles"
);

createChart(
    "/api/genre-data",
    "genreChart",
    "bar",
    "Titles by Genre",
    true
);

createChart(
    "/api/country-data",
    "countryChart",
    "bar",
    "Titles by Country",
    true
);

createChart(
    "/api/year-data",
    "yearChart",
    "line",
    "Titles by Release Year"
);
