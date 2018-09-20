function convert(kmFloat) {
	console.log(kmFloat);
	if (kmFloat >= 0 && kmFloat <= 1) {
		return `${Math.round(kmFloat*1000)}m`;
	} else {
		return `${Math.round(kmFloat)}km`;
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
			var toAdd = {"dir": dirLst[i].attributes.Text, "dist": dirLst[i].attributes.DriveDistance, "time": dirLst[i].attributes.ElapsedTime};
			out[dirLst[i].attributes.RouteName].push(toAdd);
		}
		console.log(out);
		var accordion = `<div class="accordion" id="accordionExample">`;
		for (key in out) {
			accordion +=    `<div class="card">
    							<div class="card-header" id="${key.replace(/\s/g, '')}">
      								<h5 class="mb-0">
        								<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${key.replace(/\s/g, '')}collapse" aria-expanded="true" aria-controls="collapseOne">
          									${key}
        								</button>
      								</h5>
    							</div>
    							<div id="${key.replace(/\s/g, '')}collapse" class="collapse" data-parent="#accordionExample">
    								<div class="card-body">
										<table class="table">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">Distance</th>
													<th scope="col">Instruction</th>
													<th scope="col">Estimated Time</th>
												</tr>
											</thead>
											<tbody>`;
			for (i = 0; i < out[key].length; i++) {
					accordion +=				`<tr>
													<th scope="row">${i+1}</th>
													<td>${convert(out[key][i]["dist"])}</td>
													<td>${out[key][i]["dir"]}</td>
													<td>${out[key][i]["time"]} min</td>
												</tr>`;
			}
			accordion += 					`</tbody>
										</table>
					 				</div>
								</div>
							</div>`;

		}
		accordion += 	`</div>`;
		console.log(accordion);
		$('#header').after(accordion);
	});
});