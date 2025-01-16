const API_KEY = '60ef3db772a1447db54f78e06a6522c4'; // Replace with your actual API key
const endpoint = 'https://newsapi.org/v2/top-headlines';
const country = 'us'; // Can be dynamically set based on user selection

// Initialize Leaflet map
const map = L.map('map').setView([20, 0], 2); // Global view, centered on the equator

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch news data
fetch(`${endpoint}?country=${country}&apiKey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    // Process news data and plot on map
    data.articles.forEach(news => {
      const { title, description, urlToImage, publishedAt, source } = news;
      // For simplicity, using the country for coordinates (you may want to refine this based on real location data)
      const lat = news.geo?.lat || 0;  // Fallback if location data is missing
      const lon = news.geo?.lon || 0;

      const marker = L.marker([lat, lon]).addTo(map);
      marker.bindPopup(`<b>${title}</b><br>${description}<br><img src="${urlToImage}" width="100px">`);
    });
  })
  .catch(error => console.error('Error fetching news data:', error));

  fetch('http://localhost:3000/news?country=us')
  .then(response => response.json())
  .then(data => {
    // Process and display the news data...
  });

