var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);

function getRand() {
  return Math.floor((Math.random() * 256));
}

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

  var template = {
    title: "{Name}",
    content [{
      type: "fields",
      fieldInfos: [{
        fieldName: "Name"
      }, {
        fieldName: "StartTime"
      }, {
        fieldName: "EndTime"
      }, {
        fieldName: "TotalCost"
      }]
    }]
  }

  out_routes_p.done(function(data) {
    array.forEach(data.value.features, function(feature) {
      var lineSymbol = new SimpleLineSymbol({
        color: [getRand(), getRand(), getRand()],
        width: 4
      });
      var graphic = Graphic.fromJSON(feature);
      graphic.popupTemplate = template;
      graphic.symbol = lineSymbol;
      view.graphics.add(graphic);
    }, this);
  }); 
});