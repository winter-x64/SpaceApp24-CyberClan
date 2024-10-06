// Initialize the map and center it on India (lat: 20.5937, lon: 78.9629)
var map = L.map("map", {
  minZoom: 2, // Set minimum zoom level to avoid seeing repeated world tiles
  maxZoom: 18, // Set maximum zoom level for better detail
  worldCopyJump: true, // Ensures smooth panning at the map edges
}).setView([20.5937, 78.9629], 5); // Center the map on India with zoom level 5

// Load and display the OpenStreetMap tiles, preventing tile repetition
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18, // Set max zoom level
  noWrap: true, // Prevent tile wrapping
}).addTo(map);

// Add the map markers from Python/Flask
var locations = []; // This should be populated with coordinates and names

// Store the markers for easy access later
var markers = [];

locations.forEach(function (loc) {
  var marker = L.marker(loc.coords).addTo(map).bindPopup(loc.name);
  markers.push(marker); // Add to markers array
});

// Add a geocoder (search bar) to allow users to search for locations
var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    // Remove existing search markers
    markers.forEach((marker) => map.removeLayer(marker));

    // Get the location's coordinates and add a new marker
    var latLng = e.geocode.center;
    var marker = L.marker(latLng)
      .addTo(map)
      .bindPopup(e.geocode.name)
      .openPopup();
    map.setView(latLng, 15);
    getWeather(latLng.lat, latLng.lng);
  })
  .addTo(map);

function toggleSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.classList.toggle("active");
  searchInput.style.display = searchInput.style.display === "none" ? "block" : "none";
  searchInput.focus(); 
}

const apiKey = "9353df61094eff4ccccbfac2002f04ed"


function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const location = data.name;
      document.getElementById("weatherDescription").textContent =
        "Weather: " + weatherDescription;
      document.getElementById("temperature").textContent =
        "Temperature: " + temperature + "°C";
      document.getElementById("location").textContent = "Location: " + location;

      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      document.getElementById("weatherIcon").src = iconUrl;
      document.getElementById("weatherContainer").style.display = "block";
    })
    .catch((error) => console.log("Error fetching weather data: ", error));
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon); 
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
window.onload = getLocation;

