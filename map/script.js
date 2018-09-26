require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function(
  Map,
  MapView
) {

  // Create the Map
  var map = new Map({
    basemap: "streets-navigation-vector"
  });

  // Create the MapView
  var view = new MapView({
    container: "map",
    map: map,
    center: [-80, 35],
    zoom: 3
  });
});