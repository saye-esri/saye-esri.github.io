require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function(
  Map,
  MapView
) {

  const layer = new FeatureLayer({
  // URL to the service
  url: "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/ja6f1d378ba31413281c3549d86750e40/results/out_routes?f=json&token=qyKtAAGxxI_dhtgs7fWBJmCOchiSFWB9LG4gg41UIYQPe8LOXyBsx0nrtoBnZDOsx8hwS1C5319legeQKAauR70BhAQvYsaVsCm43-4Z-0pqhcUmG2suOPQjnnQ-rPS13hKtEIn7hUwN0sfmvs0rmUB6n1MwU2vJjjQCTCiDPE1d2Nc-ezDKe0qzNE4BhKb6Qi0bVTbv5BT4Jfyk9nAnjQ.."
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