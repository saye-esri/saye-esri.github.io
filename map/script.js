var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);
var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);
var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);
var out_stops_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_stops?f=json&token=${sessionStorage.getItem("token")}`);
var offsetRun = 0;

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

function getRand() {
  return Math.floor((Math.random() * 256));
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

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
  "esri/widgets/LayerList",
  "esri/layers/FeatureLayer",
  "esri/layers/support/Field"
], function(
  Map,
  MapView,
  domReady,
  array,
  Graphic,
  LayerList,
  FeatureLayer,
  Field
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

  function offset(layer){
    var offsetDistance = calcOffset();
    for(var i=0; i<layer.graphics.length; i++){
      var graphic = layer.graphics[i];
      var offsetGeometry = geometryEngine.offset(graphic.geometry, offsetDistance, "meters", "round");
      graphic.setGeometry(offsetGeometry);
    }
    offsetRun=1;
  }

  function calcOffset() {
    return (map.extent.getWidth() / map.width) * 3;
  }

  const labelClass = {
    symbol: {
      type: 'text',
      color: 'black',
      haloColor: 'white',
      font: {
        size: 12,
        weight: 'bold'
      }
    },
    labelPlacement: 'center-right',
    labelExpressionInfo: {
      expression: "$feature.Sequence"
    }
  };

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

  view.when(function() {
    view.ui.add(layerList, {
      position: 'top-right'
    });
  }
  

  
  // on output routes load
  out_routes_p.done(function(data) {
    // Handle Invalid Token
    if (JSON.stringify(data).includes("Invalid Token")) {
      alert('Invalid Token');
      window.location.href = "/";
    }
    //Create array of Field
    var routeFields = [];
    array.forEach(data.value.fields, function(field) {
      routeFields.push(Field.fromJSON(field));
    }, this);

    //For each route add FeatureLayer to map
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
        fields: routeFields,
        geometryType: "polyline",
        renderer: renderer,
        title: graphic.attributes.Name
      });
      routes.makeTemplate();
      map.add(routes);
    }, this);
  });

  //On input orders load
  in_orders_p.done(function(data) {
    //Init vars
    var orderArray = [];
    var orderFields = initFields();
    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: [20, 240, 20],
        size: '8px'
      }  
    };
    //Populate vars
    array.forEach(data.value.features, function(feature) { 
      var graphic = Graphic.fromJSON(feature);
      orderFields.addFields(graphic.attributes);
      orderArray.push(graphic);
      console.log(graphic);
    }, this);

    //Create FeatureLayer with vars and add to map
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


  //On depot layers load
  in_depots_p.done(function(data) {
    //Init vars;
    var depotArray = [];
    var depotFields = initFields();
    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: [20,20, 240],
        size: '8px'
      }
    };
    //Populate vars
    array.forEach(data.value.features, function(feature) {
      var graphic = Graphic.fromJSON(feature);
      depotFields.addFields(graphic.attributes);
      depotArray.push(graphic);
      console.log(graphic);
    }, this);
    //Create FeatureLayer with vars and add to map
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

  //Make new promise and on resolve
  Promise.all([in_orders_p, in_depots_p, out_stops_p]).then(function(lst) {
    //Add geometry to stops, init vars
    var stops = addGeometry(lst[0], lst[1], lst[2]);
    var stopArray = [];
    var stopFields = [];
    var renderer = {
      type: 'simple',
      symbol: {
        type: 'simple-marker',
        color: [240, 20, 20],
        size: '8px'
      }
    };
    //Populate features
    array.forEach(stops.value.features, function(feature) {
      stopArray.push(Graphic.fromJSON(feature));
    }, this);
    //Populate fields
    array.forEach(stops.value.fields, function(field) {
      stopFields.push(Field.fromJSON(field));
    }, this);
    //Create FeatureLayer with vars
    var stops = new FeatureLayer({
      source: stopArray,
      objectIdField: 'ObjectID',
      fields: stopFields,
      geometryType: 'point',
      renderer: renderer,
      title: 'Stops',
      labelingInfo: [labelClass],
      visible: false
    });
    stops.makeTemplate();
    map.add(stops);
    //Zoom to extent
    stops.when(function(){
      watchUtils.whenTrue(view, 'stationary', function() {
        if (view.extent && offsetRun === 0) {
          console.log('hi');
          offset(stops);
        }
      });
      return stops.queryExtent();
    })
    .then(function(response){
      view.goTo(response.extent);
      view.extent.expand(2);
    });
  });
});