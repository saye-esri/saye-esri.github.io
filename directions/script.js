function convert(kmFloat) {
	if (kmFloat > 0 && kmFloat < 1) {
		return `${Math.round(kmFloat/1000)}m`
	} else {
		return `${Math.round(kmFloat)}km`
	}
}

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
			out[dirLst[i].attributes.RouteName].push(toAdd);
		}
		console.log(out);
		var accordion = `<div class="accordion" id="accordionExample">`;
		for (key in out) {
			accordion +=    `<div class="card">
    							<div class="card-header" id="${key}">
      								<h5 class="mb-0">
        								<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          									${key}
        								</button>
      								</h5>
    							</div>
    							<div id="${key}collapse" class="collapse show" data-parent="#accordionExample">
    								<div class="card-body>
										<ul class="list-group list-group-flush">`;
			for (i = 0; i < out[key].length; i++) {
				accordion +=				`<li class="list-group-item">${out[key][i]["dir"]} ${convert(out[key][i]["dist"])}</li>`;
			}
			accordion += 				`</ul>
					 				</div>
								</div>
							</div>`;

		}
		accordion += 	`</div>`;
		$('#header').after(accordion);
	});
});