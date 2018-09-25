var map = L.map("map").setView([0, 0], 12);
L.esri.basemapLayer("Topographic",{
  detectRetina:true
}).addTo(map);

var stops = L.markerClusterGroup();

var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);

var out_stops_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_stops?f=json&token=${sessionStorage.getItem("token")}`);

var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);

var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);

var include = {
  ObjectID: false,
  Name: true,
  ViolatedConstraints: false,
  OrderCount: true,
  TotalCost: false,
  RegularTimeCost: false,
  OvertimeCost: false,
  DistanceCost: false,
  TotalTime: true,
  TotalOrderServiceTime: true,
  TotalBreakServiceTime: false,
  TotalTravelTime: true,
  TotalDistance: true,
  StartTime: true,
  EndTime: true,
  StartTimeUTC: false,
  EndTimeUTC: false,
  TotalWaitTime: false,
  TotalViolationTime: false,
  RenewalCount: false,
  TotalRenewalServiceTime: false,
  Shape_Length: false,
  DeliveryQuantities: true,
  StopType: true,
  RouteName: true,
  Sequence: true,
  FromPrevTravelTime: true,
  FromPrevDistance: true,
  ArriveTime: true,
  DepartTime: true
};


var unit = {
  assign: function(attr, val) {
    if (this[attr] == 'time') {
      return this.makeTime(val); 
    } else if (this[attr] == 'stoptype') {
      return this.stopType(val);
    } else {
      if (isNaN(val)) {
        return val + this[attr];
      } else {
        return +Number(val).toFixed(2) + this[attr];
      }
    }
  },
  makeTime: function(UTC) {
    var t = new Date(UTC);
    var out = `${leadingzero(t.getDate())}/${leadingzero(t.getMonth()+1)}/${t.getFullYear()} ${leadingzero(t.getHours())}:${leadingzero(t.getMinutes())}`;
    return out;
  },
  stopType: function(stop) {
    if (stop == 0) {
      return 'Order'
    } else if (stop == 1) {
      return 'Depot'
    } else if (stop == 2) {
      return 'Break'
    }
  },
  ObjectID: '',
  Name: '',
  ViolatedConstraints: '',
  OrderCount: '',
  TotalCost: ' $',
  RegularTimeCost: ' $',
  OvertimeCost: ' $',
  DistanceCost: ' $',
  TotalTime: ' min',
  TotalOrderServiceTime: ' min',
  TotalBreakServiceTime: ' min',
  TotalTravelTime: ' min',
  TotalDistance: ' km',
  StartTime: 'time',
  EndTime: 'time',
  StartTimeUTC: 'time',
  EndTimeUTC: 'time',
  TotalWaitTime: ' min',
  TotalViolationTime: ' min',
  RenewalCount: '',
  TotalRenewalServiceTime: ' min',
  Shape_Length: '',
  DeliveryQuantities: '',
  StopType: 'stoptype',
  RouteName: '',
  Sequence: '',
  FromPrevTravelTime: ' min',
  FromPrevDistance: ' km',
  ArriveTime: 'time',
  DepartTime: 'time'
};

function leadingzero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function addSpace(string) {
  return string.replace(/([A-Z])/g, ' $1').trim();
}

function getColor(d) {
  return d === 'Orders'  ? "#de2d26" :
         d === 'Depots'  ? "#377eb8" :
         d === 'Stops' ? "#4daf4a" : "#984ea3";
}

function makeColor() {
	var color;
var r = Math.floor(Math.random() * 255);
var g = Math.floor(Math.random() * 255);
var b = Math.floor(Math.random() * 255);
color= "rgb("+r+" ,"+g+","+ b+")"; 
return color;
}

function addGeometry(orderData, depotData, stopData) {
  var orders = L.esri.Util.arcgisToGeoJSON(orderData.value);
  var depots = L.esri.Util.arcgisToGeoJSON(depotData.value);
  var stops  = L.esri.Util.arcgisToGeoJSON(stopData.value);
  for (i = 0; i < stops.features.length; i++) {
    for (j = 0; j < orders.features.length; j++) {
      if (stops.features[i].properties.Name == orders.features[j].properties.Name) {stops.features[i].geometry = orders.features[j].geometry}
    }
    for (k = 0; k < depots.features.length; k ++) {
      if (stops.features[i].properties.Name == depots.features[k].properties.Name) {stops.features[i].geometry = depots.features[k].geometry}
    }
  }
}

function makeLayer(data, color) {
  var newlayer= L.geoJson(L.esri.Util.arcgisToGeoJSON(data.value), {
    pointToLayer: function(feature, latlng) {
      if (feature.geometry.type == "Point") return L.circleMarker(latlng, {radius: 8});
    },
    style: function(feature) {
    	if (color) {
  		  return {stroke: false, fill: true, color: color, fillOpacity: 0.8};
    	} else {
    	  return {weight: 6, color: makeColor()};
    	}	
    },
    onEachFeature: function(feature, layer) {
      console.log(layer);
      var popupContent = `<table class='table table-striped table-bordered'>
                            <thead>
                              <tr>
                                <th scope="col">Attribute</th>
                                <th scope="col">Value</th>
                              </tr>
                            </thead>
                            <tbody>`;
      for (p in feature.properties) {
        if (include[p]) {
          popupContent += "<tr><td>" + addSpace(p) + "</td><td>" + unit.assign(p, feature.properties[p]) + "</td></tr>"
        }
      }
      popupContent += "</tbody></table>"
      layer.bindPopup(popupContent, {maxWidth: 600});
    }
  });
  return newlayer;
};

out_routes_p.done(function(data) {
  if (data.value == null) {
    alert('Token has expired.');
    window.location.href = '/';
  }
  var routes = makeLayer(data, null);
  routes.addTo(map);
  map.fitBounds(routes.getBounds());
  
});


Promise.all([in_orders_p, in_depots_p, out_stops_p]).then(function(lst){
  var in_orders = lst[0];
  var in_depots = lst[1];
  var out_stops = lst[2];
  addGeometry(in_orders, in_depots, out_stops);
  var stopslayer = makeLayer(out_stops, getColor('Stops'));
  var orderlayer = makeLayer(in_orders, getColor('Orders'));
  var depotlayer = makeLayer(in_depots, getColor('Depots'));
  stopslayer.addTo(stops);
  orderlayer.addTo(map);
  depotlayer.addTo(map);
});


var overlayStops = {
    "Stops" : stops
}; 
L.control.layers(null, overlayStops).addTo(map);





var legend = L.control({position: 'bottomleft'});
legend.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'info legend');
  labels = ['<strong>Categories</strong>'],
  categories = ['Orders','Depots','Stops'];

  for (var i = 0; i < categories.length; i++) {

          div.innerHTML += 
          labels.push(
              '<i class="circle" style="background:' + getColor(categories[i]) + '"></i>' +
          (categories[i] ? categories[i] : '+'));

      }
      div.innerHTML = labels.join('<br>');
  return div;
};
legend.addTo(map);
