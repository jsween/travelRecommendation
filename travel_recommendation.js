let allRecommendations = [];
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const resetFormBtn = document.getElementById('resetFormBtn');
const resultsDiv = document.getElementById("results");

const singularToPluralMap = {
    beach: "beaches",
    beaches: "beaches",
    country: "countries",
    countries: "countries",
    temple: "temples",
    temples: "temples"
};

// Load JSON
function loadJSON() {
    const xhr = new XMLHttpRequest();
    const url = "./travel_recommendation_api.json";

    xhr.open('GET', url);

    xhr.onload = function() {
        if (xhr.status == 200) {
            allRecommendations = JSON.parse(xhr.responseText);
        } else {
            console.error("Failed to load JSON file");
        }
    }

    xhr.onerror = function() {
        console.error("An error occurred during the XMLHttpRequest");
    }

    xhr.send();
}

// Search
function search() {
    const query = searchBar.value.toLowerCase().trim();
    const recKey = singularToPluralMap[query];
    render(allRecommendations[recKey], query)
}

// Render
function render(results, title) {
    resultsDiv.innerHTML = "";
    const section = createSection(title);
    const beachesTemples = ["beaches", "temples"];
    resultsDiv.style.background = "rgba(0, 0, 0, 0.8)";

    if (results) {
        if (beachesTemples.some(bt => bt.includes(title))) {
            results.forEach(e => {
                section.innerHTML += `
                    <h3>${e.name}</strong></h3>
                    <img src="./assets/${e.imageUrl}" alt="${e.name}" style="width: 200px; height: auto;">
                    <p>${e.description}</p>
                `;
            });
        } else {
            const randId = Math.floor(Math.random() * 3);
            const country = results[randId];
                country.cities.forEach(city => {
                    section.innerHTML += `
                        <div class="city">
                            <h4>${city.name}</h4>
                            <img src="./assets/${city.imageUrl}" alt="${city.name}" style="width: 200px; height: auto;">
                            <p>${city.description}</p>
                        <div>
                    `;
                });
                section.innerHTML += `</div>`;
            // });
        }    
    } else {
        section.innerHTML += `
            <p>No results found...</p>
            <p>Please try searching for 'beach', 'country', or 'temple'</p>
        `;
    }
    resultsDiv.append(section);
}

function createSection(id) {
    const section = document.createElement("div");
    section.className = "section";
    section.id = id;
    section.innerHTML = `<h2>${capitalizeFirstLetter(id)} Recommendations:</h2>`;
    return section
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Reset 
function clearForm() {
    resultsDiv.innerHTML = "";
    searchBar.value = "";
    resultsDiv.style.background = "rgba(0, 0, 0, 0)";
}

// Add event listeners
searchBtn.addEventListener('click', search);
resetFormBtn.addEventListener('click', clearForm);
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        search();
    }
  });

window.onload = loadJSON;