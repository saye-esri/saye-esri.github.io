require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!",
  "esri/layers/FeatureLayer",
  "esri/tasks/Geoprocessor"
], function(
  Map,
  MapView,
  domReady,
  FeatureLayer,
  Geoprocessor
) {

  var url = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes/`
  var mytoken = sessionStorage.getItem('token')


  var layer = new FeatureLayer(url);

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