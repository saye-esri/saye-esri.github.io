var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);
var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);
var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);
var out_stops_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_stops?f=json&token=${sessionStorage.getItem("token")}`);


function getRand() {
  return Math.floor((Math.random() * 256));
}

var orderFields = [
{
  name: 'ObjectID',
  alias: 'ObjectID',
  type: ' oid'
},
{
  name: 'Name',
  alias: 'Name',
  type: 'string'
},
{
  name: 'DeliveryQuantites',
  alias: 'Delivery Quantites',
  type: 'integer'
}
]


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

function addGeometry(orders, depots, stops) {
  for (i = 0; i < stops.value.features.length; i++) {
    for (j = 0; j < orders.value.features.length; j++) {
      if (stops.value.features[i].attributes.Name == orders.value.features[j].attributes.Name) {stops.value.features[i].geometry = orders.value.features[j].geometry}
    }
    for (k = 0; k < depots.value.features.length; k ++) {
      if (stops.value.features[i].attributes.Name == depots.value.features[k].attributes.Name) {stops.value.features[i].geometry = depots.value.features[k].geometry}
    }
  }
  return stops;
}

require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!",
  "dojo/_base/array",
  "esri/Graphic",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/widgets/LayerList",
  "esri/layers/FeatureLayer"
], function(
  Map,
  MapView,
  domReady,
  array,
  Graphic,
  SimpleLineSymbol,
  SimpleMarkerSymbol,
  LayerList,
  FeatureLayer
) {

  // Create the Map
  var map = new Map({
    basemap: "streets-navigation-vector"
  });

  // Create the MapView
  var view = new MapView({
    container: "map",
    map: map,
    center: [0, 0],
    zoom: 3
  });

  var layerList = new LayerList({
    view: view
  });

  view.ui.add(layerList, {
    position: 'top-right'
  });

  // all features in the layer will be visualized with
  // a 6pt black marker symbol and a thin, white outline
  var myrenderer = {
    type: "simple",  // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
      size: 6,
      color: "black",
      outline: {  // autocasts as new SimpleLineSymbol()
        width: 0.5,
        color: "white"
      }
    }
  };

  out_routes_p.done(function(data) {
    if (JSON.stringify(data).includes("Invalid Token")) {
      alert('Invalid Token');
      window.location.href = "/";
    }
    var ext = [];
    array.forEach(data.value.features, function(feature) {
      var symbol = new SimpleLineSymbol({
        color: [getRand(), getRand(), getRand()],
        width: 4
      });
      var graphic = Graphic.fromJSON(feature);
      graphic.popupTemplate = makeTemplate(feature);
      graphic.symbol = symbol;
      view.graphics.add(graphic);
      ext.push(graphic);
    }, this);
    view.when(function() {
      view.goTo(ext);
      view.extent = view.extent.expand(1.5);
    });
  });

  in_orders_p.done(function(data) {
    var ordersArray = [];
    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: [20, 240, 20],
        size: '8px'
      }  
    };

    array.forEach(data.value.features, function(feature) { 
      var graphic = Graphic.fromJSON(feature);
      graphic.popupTemplate = makeTemplate(feature);
      ordersArray.push(graphic)
    }, this);

    console.log(ordersArray);
    var orders = new FeatureLayer({
      source: ordersArray,
      objectIdField: 'ObjectID',
      fields: orderFields,
      geometryType: "point",
      renderer: renderer,
      title: 'Orders'
    });

    console.log(orders);
    orders.popupTemplate = makeTemplate(orders);
    map.add(orders);
  });

  in_depots_p.done(function(data) {
    array.forEach(data.value.features, function(feature) {
      var symbol = new SimpleMarkerSymbol({
        color: [20, 20, 240],
        size: '8px'
      });
      var graphic = Graphic.fromJSON(feature);
      graphic.popupTemplate = makeTemplate(feature);
      graphic.symbol = symbol;
      view.graphics.add(graphic);
    }, this);
  });

  Promise.all([in_orders_p, in_depots_p, out_stops_p]).then(function(lst) {
    stops = addGeometry(lst[0], lst[1], lst[2]);
    array.forEach(stops.value.features, function(feature) {
      var symbol = new SimpleMarkerSymbol({
        color: [240, 20, 20],
        size: '8px'
      });
      var graphic = Graphic.fromJSON(feature);
      graphic.popupTemplate = makeTemplate(feature);
      graphic.symbol = symbol;
      //view.graphics.add(graphic);
    }, this);
  })


});