$(document).ready(function() {
	var url = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}${(sessionStorage.getItem('json') != 'null') ? '/' + sessionStorage.getItem('json'): ''}/?f=json&token=${sessionStorage.getItem('token')}`
	console.log(url);
	$.getJSON(url, function(data) {
		$('#container').html(JSON.stringify(data, null, 4));
	});
});