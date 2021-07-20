// Add console.log to check to see if our code is working.
console.log("logic_working");

// We create the tile layer that will be the background of our map.
// Note that we're changing the variable name to default_layer. Otherwise, we would need
// to edit both the "baseMaps" base layer and the default layer name in the map object 
// to match the new tile layer variable name everytime we changed it.
let default_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/light-v10',
    // id: 'mapbox/satellite-streets-v11',
    // id: 'mapbox/navigation-night-v1',
    // id: 'mapbox/outdoors-v11',
    id: 'mapbox/navigation-guidance-day-v4',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// We create a secondary view tile layer that will be an option for our map.
let secondary = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/light-v10',
    // id: 'mapbox/satellite-streets-v11',
    id: 'mapbox/navigation-night-v1',
    // id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-guidance-day-v4',
    accessToken: API_KEY
});
// Create a base layer that holds both maps. 
let baseMaps = {
  'Light Navigation': default_layer,
  'Dark Navigation': secondary
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [default_layer]
})
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.
// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/rsenno/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// We'll create a style specification outside of the geoJSON as an alternative to inserting it in 
// the geooJSON call
// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  // L.geoJSON(data)
  L.geoJSON(data, {
    style: myStyle,
    // style: {"color": "#ffffa1",
    //   "weight": 2},
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2> <hr> <h2> Destination: " + feature.properties.dst + "</h2>");
    }
  }).addTo(map);
});



