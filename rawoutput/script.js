$(document).ready(function() {
	$.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/${sessionStorage.getItem('json')}?f=json&token=${sessionStorage.getItem('token')}`,
		function(data) {
			$('.container').html(JSON.stringify(data));
		})
});