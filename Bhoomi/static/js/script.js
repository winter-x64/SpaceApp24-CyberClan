// Initialize the map
var map = L.map("map").setView([37.7749, -122.4194], 12);

// Load and display the OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Add the map markers from Python/Flask
var locations = [];

// Store the markers for easy access later
var markers = [];

locations.forEach(function (loc) {
  var marker = L.marker(loc.coords).addTo(map).bindPopup(loc.name);
  markers.push(marker); // Add to markers array
});

// Add a geocoder (search bar)
var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
})
  .on("markgeocode", function (e) {
    // Remove existing search markers
    markers.forEach((marker) => map.removeLayer(marker));

    // Get the location's coordinates and add a marker
    var latLng = e.geocode.center;
    var marker = L.marker(latLng)
      .addTo(map)
      .bindPopup(e.geocode.name)
      .openPopup();

    // Center the map on the searched location
    map.setView(latLng, 15);
  })
  .addTo(map);
