var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);
var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);
var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);
var out_stops_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_stops?f=json&token=${sessionStorage.getItem("token")}`);
var checkOptimize;

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

function checkOptimize(optimizeID) {
  console.log('checking');
  $.ajax({
    url: `https://logistics.arcgis.com/arcgis/rest/services/World/Route/GPServer/FindRoutes/jobs/${optimizeID}?token=${sessionStorage.getItem('token')}&returnMessages=true&f=json`,
    type: "get",
    success: function(data) {
      console.log(data);
      if (data.status === "completed") {
        if (optimizeTimer) clearInterval(optimizeTimer);
        return true; 
      } else {
        return false;
      }
    }
  });
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
  "esri/Graphic",
  "esri/widgets/LayerList",
  "esri/layers/FeatureLayer",
  "esri/layers/support/Field",
  "esri/identity/IdentityManager",
  "esri/portal/Portal",
  "esri/layers/GroupLayer",
  "esri/geometry/projection",
  "esri/geometry/Point"
], function(
  Map,
  MapView,
  domReady,
  Graphic,
  LayerList,
  FeatureLayer,
  Field,
  esriId,
  Portal,
  GroupLayer,
  Projection,
  Point
) {
  var stopGeo, portal, serviceUrl;

  FeatureLayer.prototype.makeTemplate = function() {
    let template = {
      title: "{Name}",
      content: [{
        type: "fields",
        fieldInfos: []
      }]
    }
    for (i = 0, l = this.fields.length; i<l; i++) {
      if (this.fields[i].alias === 'GlobalID') continue;
      template.content[0].fieldInfos.push({
        fieldName: this.fields[i].name,
        label: this.fields[i].alias,
        visible: true
      })
    }
    console.log(this);
    if (this.geometryType === 'polyline') {
      let assignAction = {
        title: "Assign Route",
        id: "assignRoute",
        image: "/img/clipboard.jpg"
      }
      template.actions = [assignAction];
    } else if (this.title === 'Stops') {
      let assignAction = {
        title: "Change Route",
        id: "changeRoute",
        className: "esri-icon-directions"
      }
      template.actions = [assignAction];
    }
    this.popupTemplate = template;
  }

  

  const labelClass = {
    symbol: {
      type: 'text',
      color: 'black',
      haloColor: 'white',
      font: {
        size: 10,
      }
    },
    labelPlacement: 'center-right',
    labelExpressionInfo: {
      expression: `IIF($feature.StopType == 0, 'Stop ' + ($feature.Sequence-1) + ' at ' + Day($feature.ArriveTime) + '/' + Month($feature.ArriveTime) + ' ' + Hour($feature.ArriveTime) + ':' + Minute($feature.ArriveTime), $feature.Name)`
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

  

  view.when(function() {
    var layerList = new LayerList({
      view: view,
      listItemCreatedFunction: function(event) {
        if (!event.item.parent && event.item.layer.type === 'group') {
          var item = event.item;
          item.actionsSections = [[{
            title: 'Remove',
            className: 'esri-icon-trash',
            id: 'remove'
          }]];
        }
      }
    });

    layerList.on('trigger-action', function(event) {
      console.log(event);
      if (event.action.id === 'remove') {
        map.remove(event.item.layer);
      }
    });

    view.ui.add(layerList, {
      position: 'top-right'
    });

    view.popup.watch("selectedFeature", function(graphic) {
      if (graphic && graphic.attributes.StopType != null) {
        var graphicTemplate = graphic.getEffectivePopupTemplate();
        graphicTemplate.actions.items[0].visible = graphic.attributes.StopType === 0 ? true : false
      }
    });
  });
  

  

  view.popup.on('trigger-action', function(event) {
    if (event.action.id === "assignRoute") {
      $('#assignModalTitle').html(event.target.title);
      $('#assignModal').modal('show');
    } else if (event.action.id === "changeRoute") {
      console.log(event)
      $('#changeModalTitle').html(event.target.title)
      $('#changeModal').modal('show');
    }
  });
  

  esriId.registerToken({
    server: 'https://www.arcgis.com/sharing/rest',
    token: sessionStorage.getItem('token'),
    userId: sessionStorage.getItem('user')
  });

  portal = new Portal({
    authMode: 'immediate'
  });

  portal.load().then(function() {
    console.log(portal);
    portal.queryItems({
      query: 'type:Workforce Project AND access:shared'
    }).then(function(result) {
      console.log(result);
      result.results[0].fetchRelatedItems({
        relationshipType: 'Service2Layer'
      }).then(function(newresult) {
        console.log(newresult)
      });
    });
    /*
    var test = new GroupLayer({
      portalItem: {
        id: '947c68deba3c4b7fb4a9e959cfb030a9'
      }
    });
    map.add(test);
    */
    portal.queryItems({
      query: 'title:workers_ AND access:shared AND type:Feature Service'
    }).then(function(queryResult) {
      var workers = new FeatureLayer({
        title: 'Workers',
        refreshInterval: 0.2,
        portalItem: queryResult.results[0]
      });
      workers.when(function() {
        workers.makeTemplate();
      });
      map.add(workers);

      var workerQuery = workers.createQuery();
      workerQuery.outFields = ['Name', 'OBJECTID'];
      workers.queryFeatures(workerQuery).then(function(result) {
        var workersHTML = ''
        result.features.forEach(function(feature) {
          workersHTML += `<option value="${feature.attributes.OBJECTID}">${feature.attributes.name}</option>`
        });
        $('#assignToWorker').html(workersHTML);
      });
    });

    portal.queryItems({
      query: 'title:assignments_ AND access:shared AND type:Feature Service'
    }).then(function(queryResult) {
      serviceUrl = queryResult.results[0].url;
      var assignments = new FeatureLayer({
        portalItem: queryResult.results[0]
      });
      assignments.load();
      assignments.when(function() {
        var assignTypeField = assignments.fields.find(function(elem) {
          return (elem.name === "assignmentType");
        });
        var assignTypeHTML = ''
        assignTypeField.domain.codedValues.forEach(function(elem) {
          assignTypeHTML += `<option value="${elem.code}">${elem.name}</option>`
        });
        $('#assignType').html(assignTypeHTML);
      });
    });
  });
  
  // on output routes load
  out_routes_p.done(function(data) {
    // Handle Invalid Token
    if (JSON.stringify(data).includes("Invalid Token")) {
      alert('Invalid Token');
      window.location.href = "/";
    }
    //Create array of Field
    var routeFields = [];
    data.value.fields.forEach(function(field) {
      routeFields.push(Field.fromJSON(field));
    }, this);

    //For each route add FeatureLayer to map
    data.value.features.forEach(function(feature) {
      let renderer = {
        type: 'simple', 
        symbol: {
          type: 'simple-line',
          color: [getRand(), getRand(), getRand()],
          width: 4
        }
      };
      let graphic = Graphic.fromJSON(feature);
      /*
      graphic.setAttribute('geometry', 
        webMercatorUtils.geographicToWebMercator(graphic.geometry));
        */
      let name = graphic.attributes.Name;
      $('#routeTo').append(`<option value="${name}">${name}</option>`)
      var routes = new FeatureLayer({
        source: [graphic],
        objectIdField: 'ObjectID',
        fields: routeFields,
        geometryType: "polyline",
        renderer: renderer,
        title: name
      });
      routes.makeTemplate();
      map.add(routes, 0);
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
    data.value.features.forEach(function(feature) { 
      var graphic = Graphic.fromJSON(feature);
      /*
      graphic.setAttribute('geometry', 
        webMercatorUtils.geographicToWebMercator(graphic.geometry));
        */
      orderFields.addFields(graphic.attributes);
      orderArray.push(graphic);
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
    //map.add(orders);
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
    data.value.features.forEach(function(feature) {
      var graphic = Graphic.fromJSON(feature);
      /*
      graphic.setAttribute('geometry', 
        webMercatorUtils.geographicToWebMercator(graphic.geometry));
        */
      depotFields.addFields(graphic.attributes);
      depotArray.push(graphic);
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
    //map.add(depots);
  });

  //Make new promise and on resolve
  Promise.all([in_orders_p, in_depots_p, out_stops_p]).then(function(lst) {
    //Add geometry to stops, init vars
    stopGeo = addGeometry(lst[0], lst[1], lst[2]);

    $.ajax({
      url: 'https://logistics.arcgis.com/arcgis/rest/services/World/Route/GPServer/FindRoutes/submitJob',
      type: 'post',
      data: {
          token: sessionStorage.getItem('token'),
          stops: JSON.stringify(stopGeo),
          f: 'json'
      },
      success: function(data) {
        console.log(data);
        if(!(checkOptimize(data.jobId))) {
          optimizeTimer = setInterval(function() {
            checkOptimize(data.jobId);
          }, 1000);
        }
      }
    });

    var stopArray = [];
    var stopFields = [];
    var renderer = {
      type: 'unique-value',
      field: 'StopType',
      defaultSymbol: {
        type: 'simple-marker',
        color: [240, 240, 20],
        size: '8px'
      },
      uniqueValueInfos: [{
        value: '0',
        symbol: {
          type: 'simple-marker',
          color: [240, 20, 20],
          size: '8px'
        }
      }]
    };
    //Populate features
    stopGeo.value.features.forEach(function(feature) {
      var graphic = Graphic.fromJSON(feature);
      /*
      graphic.setAttribute('geometry', 
        webMercatorUtils.geographicToWebMercator(graphic.geometry));
        */
      stopArray.push(graphic);
    }, this);
    //Populate fields
    stopGeo.value.fields.forEach(function(field) {
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
      labelingInfo: [labelClass]
    });
    stops.makeTemplate();
    map.add(stops);
    //Zoom to extent
    stops.when(function(){
      return stops.queryExtent();
    })
    .then(function(response){
      view.goTo(response.extent);
      view.extent.expand(3.0);
    });
  });

  $('#assign').on('click', function() {
    $('#assignModal').modal('hide').on('hidden.bs.modal', function() {
      console.log(stopGeo, portal, serviceUrl);
      var routeName = $('#assignModalTitle').html();
      var dispatchers;
      var assignArr = []; //make and sort array of stops on this route
      stopGeo.value.features.forEach(function(elem) {
        if (elem.attributes.RouteName === routeName && elem.attributes.StopType === 0) {
          assignArr.push(elem);
        }
      });
      assignArr.sort(function(a, b) {
        return a.attributes.Sequence - b.attributes.Sequence
      });

      //find the dispatcher ID associated with current portal login
      portal.queryItems({
        query: 'title:dispatchers_ AND access:shared AND type:Feature Service'
      }).then(function(result) {
        dispatchers = new FeatureLayer({
          portalItem: result.results[0]
        });
        dispatchers.load().then(function() {
          var dispatcherQuery = dispatchers.createQuery();
          dispatcherQuery.outFields = ['OBJECTID'];
          dispatcherQuery.where = `userId = '${portal.user.username}'`
          dispatchers.queryFeatures(dispatcherQuery).then(function(result) {

            //Project points on map in 4326 to AGOL compatible 102100
            Projection.load().then(function() {
              var features = [];
              assignArr.forEach(function(elem) {
                let point = new Point({
                  latitude: elem.geometry.y,
                  longitude: elem.geometry.x,
                  spatialReference: {wkid: 4326}
                });
                let projected = Projection.project(point, {wkid: 102100})

                //Create Object for ajax request
                let assignment = {
                  geometry: {
                    x: projected.x,
                    y: projected.y
                  },
                  attributes : {
                    status: 1,
                    assignmentType: Number($('#assignType').val()),
                    location: elem.attributes.Name,
                    assignmentRead: 0,
                    dispatcherId: result.features[0].attributes.OBJECTID,
                    description: $('#description').val(),
                    priority: Number($('#priority').val()),
                    workerId: Number($('#assignToWorker').val()),
                    assignedDate:  new Date().getTime()
                  }
                };
                //Add assignment object to array
                features.push(assignment);
              });
              //Send array of assignments to REST API
              $.ajax({
                url: serviceUrl + `/0/addFeatures?token=${sessionStorage.getItem('token')}`,
                type: "post",
                dataType: "json",
                data: {
                  f: "json",
                  features: JSON.stringify(features)
                },
                success: function(result) {
                  console.log(result); 
                }
              });
            });
          });
        });
      });
    });
  });

  $('#reRoute').one('click', function() {
    let stopName = $('#changeModalTitle').html();
    let inputParameters = JSON.parse(sessionStorage.getItem('jobrequest'));
    let orders = JSON.parse(inputParameters.orders);
    console.log(orders);
    orders.features.forEach(function(elem) {
      if (elem.attributes.Name === stopName) {
        let seq = $('#inSequence').val();
        elem.attributes.RouteName = $('#routeTo').val();
        if (seq) {
          elem.attributes.Sequence = seq
        }
      }
    });
    inputParameters.orders = JSON.stringify(orders);
    inputParameters.token = sessionStorage.getItem('token');
    $.ajax({
      url: "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/submitJob",
      type: "POST",
      data: inputParameters,
      dataType: "json",
      success: function (result) {
        if ('error' in result) {
            console.log(result);
            alert('invalid token')
            window.location.href = "/";
        }
        sessionStorage.setItem("jobid", result.jobId);
        var history = JSON.parse(localStorage.getItem('jobhistory'));
        if (history == null) history = {};
        var now = new Date();
        history[now] = result.jobId;
        localStorage.setItem('jobhistory', JSON.stringify(history));
        if (result.jobStatus == "esriJobSubmitted") {
            sessionStorage.setItem('jobrequest', JSON.stringify(inputParameters));
            window.location.href = '/processing';
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    }); 
  });

  $('#map')
  .on('dragover', function(event) {
    event.preventDefault();
    return false;
  })
  .on('drop', function(event) {
    console.log(event);
    var tmp = event.originalEvent.dataTransfer.getData('URL');
    var newLayer = new GroupLayer({
      portalItem: {
        id: tmp.split('=')[1]
      }
    });
    newLayer.load().then(
    function(resolve) {
      map.add(newLayer);
    },
    function(error) {
      console.log('error');
      var alertHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        Error adding layer: ${error}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>`

      $('#map').before(alertHTML);
    });
  
    return false;
  });

});