require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!",
  "esri/layers/FeatureLayer"
], function(
  Map,
  MapView,
  domReady,
  FeatureLayer
) {

  const layer = new FeatureLayer({
  // URL to the service
  url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
  });

  // Create the Map
  var map = new Map({
    basemap: "streets-navigation-vector",
    layers: [layer]
  });

  // Create the MapView
  var view = new MapView({
    container: "map",
    map: map,
    center: [-80, 35],
    zoom: 3
  });
});