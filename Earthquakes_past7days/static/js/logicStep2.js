// Add console.log to check to see if our code is working.
console.log("logic_working");

// We create the tile layer that will be the background of our map.
// Note that we're changing the variable name to default_layer. Otherwise, we would need
// to edit both the "baseMaps" base layer and the default layer name in the map object 
// to match the new tile layer variable name everytime we changed it.
let default_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/light-v10',
    // id: 'mapbox/satellite-streets-v11',
    // id: 'mapbox/navigation-night-v1',
    // id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-guidance-day-v4',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// We create a secondary view tile layer that will be an option for our map.
let secondary_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // id: 'mapbox/streets-v11',
    // id: 'mapbox/dark-v10',
    // id: 'mapbox/light-v10',
    id: 'mapbox/satellite-streets-v11',
    // id: 'mapbox/navigation-night-v1',
    // id: 'mapbox/outdoors-v11',
    // id: 'mapbox/navigation-guidance-day-v4',
    accessToken: API_KEY
});
// Create a base layer that holds both maps. 
let baseMaps = {
  'Streets': default_layer,
  'Satellite': secondary_layer
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [default_layer]
})
// Pass our map layers into our layers control and add the layers control to the map.
// L.control.layers(baseMaps).addTo(map);

// Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.
// Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/rsenno/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// We'll create a style specification outside of the geoJSON as an alternative to inserting it in the geooJSON call
// let myStyle = {
//   fillColor: "#ffffa1",
//   // fillcolor: "yellow",
//   color: "blue",
//   weight: 1,
//   fillOpacity: 0.2
// }
// // Grabbing our GeoJSON data.
// d3.json(torontoHoods).then(function(data) {
//   console.log(data);
//   // Creating a GeoJSON layer with the retrieved data.
//   // L.geoJSON(data).addTo(map);
//   L.geoJSON(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2> <hr> <h2> Area S Code: " + feature.properties.AREA_S_CD + "</h2>");
//     }
//   }).addTo(map);
// });
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {

    // We turn each feature into a circleMarker on the map.
  
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
    },
      // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo
  }).addTo(map);
});


