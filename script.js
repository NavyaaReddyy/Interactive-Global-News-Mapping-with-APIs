// Your News API key here
const API_KEY = '1b5c5a3403e06a8e06c7548a95c1feb2';

// Coordinates for major countries (you can add more countries as needed)
const countryCoordinates = {
    'us': [37.0902, -95.7129],  // United States
    'gb': [51.5074, -0.1278],   // United Kingdom
    'de': [51.1657, 10.4515],   // Germany
    'in': [20.5937, 78.9629],   // India
    'fr': [46.6034, 1.8883],    // France
    'jp': [36.2048, 138.2529],  // Japan
    'ca': [56.1304, -106.3468], // Canada
    'au': [-25.2744, 133.7751], // Australia
    'br': [-14.2350, -51.9253]  // Brazil
};

// Initialize the Leaflet map
const map = L.map('map').setView([20, 0], 2); // Global view

// Adding OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to fetch news articles based on country code
async function fetchNews(countryCode) {
    try {
        console.log(`Fetching news for ${countryCode}...`); // Log for debugging
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEY}`);
        const data = await response.json();
        
        if (data.status === "ok" && data.articles) {
            console.log(`Fetched ${data.articles.length} articles for ${countryCode}`);
            return data.articles;
        } else {
            console.error(`Failed to fetch news for ${countryCode}:`, data.message);
            return [];
        }
    } catch (error) {
        console.error(`Error fetching news for ${countryCode}:`, error);
        return [];
    }
}

// Function to plot markers and bind popup for news articles
async function plotNewsOnMap(countryCode) {
    console.log(`Fetching and displaying news for ${countryCode}...`);
    const newsArticles = await fetchNews(countryCode);

    // Clear any existing markers on the map to avoid overlap
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // If no articles were returned
    if (newsArticles.length === 0) {
        alert(`No news articles found for ${countryCode}.`);
        return;
    }

    // Loop through articles and add markers
    newsArticles.forEach(article => {
        const [lat, lng] = countryCoordinates[countryCode];
        const marker = L.marker([lat, lng]).addTo(map);

        const popupContent = `
            <div class="popup-content">
                <b>${article.title}</b><br>
                ${article.description}<br><br>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `;
        marker.bindPopup(popupContent);
    });
}

// Function to add country markers
function addCountryMarkers() {
    Object.keys(countryCoordinates).forEach(countryCode => {
        const [lat, lng] = countryCoordinates[countryCode];
        const marker = L.marker([lat, lng]).addTo(map);
        
        marker.on('click', function() {
            console.log(`Clicked on ${countryCode}`);
            plotNewsOnMap(countryCode); // Fetch and display news for the clicked country
        });
    });
}

// Initialize the country markers
addCountryMarkers();
