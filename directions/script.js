function convert(kmFloat) {
	if (kmFloat >= 0 && kmFloat <= 1) {
		return `${Math.round(kmFloat*1000)}m`;
	} else {
		return `${Math.round(kmFloat)}km`;
	}
}

function sendToNav(data) {

}

$(document).ready(function() { 

	var URL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_directions?f=json&token=${sessionStorage.getItem('token')}`
	$.getJSON(URL, function(data) {
		console.log(data);
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
      								<div class="row">
        								<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${key.replace(/\s/g, '')}collapse" aria-expanded="true" aria-controls="collapseOne">
          									${key}
        								</button>
        								<button class="btn btn-secondary ml-auto" type="button" href="${makeURL(key)}" disabled>Open in Navigator</button>
      								</div>
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
													<td>${Number(out[key][i]["time"]).toFixed(1)} min</td>
												</tr>`;
			}
			accordion += 					`</tbody>
										</table>
					 				</div>
								</div>
							</div>`;

		}
		accordion += 	`</div>`;
		$('#header').after(accordion);
	});
});