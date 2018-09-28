var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);


require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!",
  "dojo/_base/array",
  "esri/Graphic",
  "esri/symbols/SimpleLineSymbol"
], function(
  Map,
  MapView,
  domReady,
  array,
  Graphic,
  SimpleLineSymbol
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

  var lineSymbol = new SimpleLineSymbol({
    color: [255, 255, 0],
    width: 4
  });

  out_routes_p.done(function(feature) {
    array.forEach(responseJson.value.features, function(feature) {
      feature.symbol = lineSymbol;
      var graphic = new Graphic.fromJSON(feature);
      graphic.symbol = lineSymbol;
      view.graphics.add(graphic);

    }, this);
  }); 
});