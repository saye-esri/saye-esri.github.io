var map = L.map("map").setView([0, 0], 12);
L.esri.basemapLayer("Topographic").addTo(map);

var group = L.featureGroup();
group.addTo(map);

var stops = L.markerClusterGroup();

var out_routes_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_routes?f=json&token=${sessionStorage.getItem("token")}`);

var out_stops_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_stops?f=json&token=${sessionStorage.getItem("token")}`);

var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);

var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);

function addSpace(string) {
  return string.replace(/([A-Z])/g, ' $1').trim();
}

function getColor(d) {
  return d === 'Orders'  ? "#de2d26" :
         d === 'Depots'  ? "#377eb8" :
         d === 'Stops' ? "#4daf4a" :
         d === 'Roadside Hazards' ? "#984ea3" :
                      "#ff7f00";
}

function makeColor() {
	var color;
var r = Math.floor(Math.random() * 255);
var g = Math.floor(Math.random() * 255);
var b = Math.floor(Math.random() * 255);
color= "rgb("+r+" ,"+g+","+ b+")"; 
return color;
}

function addGeometry(orders, depots, stops) {
  for (i = 0; i < stops.features.length; i++) {
    for (j = 0; j < orders.features.length; j++) {
      if (stops.features[i].properties.Name == orders.features[j].properties.Name) {stops.features[i].geometry = orders.features[j].geometry}
    }
    for (k = 0; k < depots.features.length; k ++) {
      if (stops.features[i].properties.Name == depots.features[k].properties.Name) {stops.features[i].geometry = depots.features[k].geometry}
    }
  }
}

function addToMap(geoJson, layer, color) {
  L.geoJson(geoJson, {
    pointToLayer: function(feature, latlng) {
      if (feature.geometry.type == "Point") return L.circleMarker(latlng, {radius: 8});
    },
    style: function(feature) {
    	console.log(feature);
    	if (color) {
  		return {stroke: false, fill: true, color: color, fillOpacity: 0.8};
    	} else {
    	return {weight: 4, color: makeColor()};
    	}	
    },
    onEachFeature: function(feature, layer) {
      var popupContent = "<table>";
      for (var p in feature.properties) {

          popupContent += "<tr><td>" + addSpace(p) + "</td><td>" + feature.properties[p] + "</td></tr>"
      }
      popupContent += "</table>"
      layer.bindPopup(popupContent);
      //if (icon) {layer.setIcon(icon)}
    }
  }).addTo(layer)
};

out_routes_p.done(function(data) {
  addToMap(L.esri.Util.arcgisToGeoJSON(data.value), group, null);
  map.fitBounds(group.getBounds());
});

in_depots_p.done(function(data) {
  addToMap(L.esri.Util.arcgisToGeoJSON(data.value), group, getColor('Depot'));
});

in_orders_p.done(function(data) {
  addToMap(L.esri.Util.arcgisToGeoJSON(data.value), group, getColor('Orders'));
});

Promise.all([in_orders_p, in_depots_p, out_stops_p]).then(function(lst){
  var in_orders = L.esri.Util.arcgisToGeoJSON(lst[0].value);
  var in_depots = L.esri.Util.arcgisToGeoJSON(lst[1].value);
  var out_stops = L.esri.Util.arcgisToGeoJSON(lst[2].value);
  addGeometry(in_orders, in_depots, out_stops);
  addToMap(out_stops, stops, getColor('Stops'));
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