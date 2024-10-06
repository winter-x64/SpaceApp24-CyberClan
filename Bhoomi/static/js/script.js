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

    // Center the map on the searched location
    map.setView(latLng, 15);
  })
  .addTo(map);

function toggleSearch() {
  const searchInput = document.getElementById("searchInput");
  searchInput.classList.toggle("active");
  searchInput.focus(); // Automatically focus the input when it expands
}
