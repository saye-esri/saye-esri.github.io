var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);
var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);
var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);
var out_stops_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_stops?f=json&token=${sessionStorage.getItem("token")}`);


function getRand() {
  return Math.floor((Math.random() * 256));
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

Array.prototype.addFields = function(attributes) {
  for (var key in attributes) {
    var found = this.some(function(elem) {
      return elem.name === key;
    });
    if (!found) {
      var temp = {
        name: key,
        alias: key,
        type: (isInt(attributes[key])) ? 'integer' :
              (isFloat(attributes[key])) ? 'float' :
              'string'
      }
      this.push(temp);
    }
  }
}

var orderFields = [
{
  name: 'ObjectID',
  alias: 'ObjectID',
  type: 'oid'
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

function initFields() {
  var out = [
  {
    name: 'ObjectID',
    alias: 'ObjectID',
    type: 'oid'
  }
  ];
  return out;
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

  FeatureLayer.prototype.makeTemplate = function() {
    var template = {
      title: "{Name}",
      content: [{
        type: "fields",
        fieldInfos: []
      }]
    }
    for (i = 0, l = this.fields.length; i<l; i++) {
      template.content[0].fieldInfos.push({
        fieldName: this.fields[i].name,
        label: this.fields[i].alias,
        visible: true
      })
    }
    this.popupTemplate = template;
  }

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
    array.forEach(data.value.features, function(feature) {
      var renderer = {
        type: 'simple', 
        symbol: {
          type: 'simple-line',
          color: [getRand(), getRand(), getRand()],
          width: 4
        }
      };
      var graphic = Graphic.fromJSON(feature);

      var routes = new FeatureLayer({
        source: [graphic],
        objectIdField: 'ObjectID',
        fields: data.value.fields,
        geometryType: "polyline",
        renderer: renderer,
        title: graphic.attributes.Name
      });
      routes.makeTemplate();
      map.add(routes);

    }, this);
  });

  in_orders_p.done(function(data) {
    var orderArray = [];
    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: [20, 240, 20],
        size: '8px'
      }  
    };
    var orderFields = initFields();

    array.forEach(data.value.features, function(feature) { 
      var graphic = Graphic.fromJSON(feature);
      orderFields.addFields(graphic.attributes);
      orderArray.push(graphic);
      console.log(graphic);
    }, this);

    var orders = new FeatureLayer({
      source: orderArray,
      objectIdField: 'ObjectID',
      fields: orderFields,
      geometryType: "point",
      renderer: renderer,
      title: 'Orders'
    });

    orders.makeTemplate();
    map.add(orders);
  });



  in_depots_p.done(function(data) {
    var depotArray = [];
    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: [20,20, 240],
        size: '8px'
      }
    };
    var depotFields = initFields();

    array.forEach(data.value.features, function(feature) {
      var graphic = Graphic.fromJSON(feature);
      depotFields.addFields(graphic.attributes);
      depotArray.push(graphic);
      console.log(graphic);
    }, this);

    var depots = new FeatureLayer({
      source: depotArray,
      objectIdField: 'ObjectID',
      fields: depotFields,
      geometryType: 'point',
      renderer: renderer,
      title: 'Depots'
    });
    depots.makeTemplate();
    map.add(depots);
  });

  Promise.all([in_orders_p, in_depots_p, out_stops_p]).then(function(lst) {
    var stops = addGeometry(lst[0], lst[1], lst[2]);
    var stopArray = [];
    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: [240, 20, 20],
        size: '8px'
      }
    };
    array.forEach(stops.value.features, function(feature) {
      var graphic = Graphic.fromJSON(feature);
      stopArray.push(graphic);
    }, this);
    var stops = new FeatureLayer({
      source: stopArray,
      objectIdField: 'ObjectID',
      fields: lst[2].value.fields,
      geometryType: 'point',
      renderer: renderer,
      title: 'Stops'
    });
    stops.makeTemplate();
    map.add(stops);
    view.when(function() {
      view.goTo();
      view.extent = view.extent.expand(1.5);
    });
  });
});