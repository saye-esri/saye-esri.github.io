$(document).ready(function() { 

	var URL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_directions?f=json&token=${sessionStorage.getItem('token')}`
	$.getJSON(URL, function(data) {
		var dirLst = data.value.features
		var out = {};
		for (i = 0; i < dirLst.length; i++) {
			if (!(dirLst[i].attributes.RouteName in out)) {
				out[dirLst[i].attributes.RouteName] = [];
			}
			var toAdd = {"dir": dirLst[i].attributes.Text, "dist": dirLst[i].attributes.DriveDistance};
			out[dirLst[i].attributes.RouteName].append(toAdd);
		}
		console.log(out);
	});

});