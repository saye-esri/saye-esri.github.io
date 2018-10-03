var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);
var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);
var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);


function getRand() {
  return Math.floor((Math.random() * 256));
}

function makeTemplate(feature) {
  var template = {
    title: "{Name}",
    content: [{
      type: "fields",
      fieldInfos: []
    }]
  }

  for (key in feature.attributes) {
    template.content[0].fieldInfos.push({fieldName: key})
  }

  return template
}

require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!",
  "dojo/_base/array",
  "esri/Graphic",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleMarkerSymbol"
], function(
  Map,
  MapView,
  domReady,
  array,
  Graphic,
  SimpleLineSymbol,
  SimpleMarkerSymbol
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

  

  out_routes_p.done(function(data) {
    array.forEach(data.value.features, function(feature) {
      var symbol = new SimpleLineSymbol({
        color: [getRand(), getRand(), getRand()],
        width: 4
      });
      var graphic = Graphic.fromJSON(feature);
      graphic.popupTemplate = makeTemplate(feature);
      graphic.symbol = symbol;
      view.graphics.add(graphic);
    }, this);
  });

  in_orders_p.done(function(data) {
    array.forEach(data.value.features, function(feature) {
      var symbol = new SimpleMarkerSymbol({
        color: [20, 255, 20],
        size: '8px'
      });
      var graphic = Graphic.fromJSON(feature);
      graphic.popupTemplate = makeTemplate(feature);
      graphic.symbol = symbol;
      view.graphics.add(graphic);
    }, this);
  });


});