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
  url: "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/ja6f1d378ba31413281c3549d86750e40/results/out_routes?f=json&token=GABxl1Pw59gjtdkBb5a9Ly9_XSuCwWlpNLEVB2UGSHIlQIlSMjItSBhXbtPcVbwf-D6saOdNjOh7e9hawx3hlSVbVgr_t3O0iNgcTtyNME310xM9xBMNDsKWKNzjy-uUcOMPpqdQKD4doAeUUOsODijfX2CQmnxSR7rDGOotjZ-BfJvIL3bEkAV8hMSEtDM_issKFsXEJTGXTUHHZ10pmw.."
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