Array.prototype.last = function(){
    return this[this.length - 1];
};

function convert(kmFloat) {
	if (kmFloat >= 0 && kmFloat <= 1) {
		return `${Math.round(kmFloat*1000)}m`;
	} else {
		return `${Math.round(kmFloat)}km`;
	}
}

function sendToNav(data) {
	var out = {};
	for (i = 0; i < dirLst.length; i++) {
		if (!(dirLst[i].attributes.RouteName in out)) {
			out[dirLst[i].attributes.RouteName] = [];
		}
		if (dirLst[i].attributes.Type === 18 && dirLst[i].attributes.Text.slice(0,5) === 'Start') {
			var toAdd = {
				"stopName": dirLst[i].attributes.Text.slice(9), 
				"long": dirLst[i+1].geometry.paths[0][0][0],
				"lat": dirLst[i+1].geometry.paths[0][0][1]
			};
		} else if (dirLst[i].attributes.Type === 1) {
			var toAdd = {
				"stopName": dirLst[i].attributes.Text.slice(10).split(',')[0],
				"long": dirLst[i-1].geometry.paths[0].last()[0],
				"lat": dirLst[i-1].geometry.paths[0].last()[1]
			};
		}
		out[dirLst[i].attributes.RouteName].push(toAdd);
	}
	return out;
}

function makeDirs(data) {
	var out = {};
	for (i = 0; i < dirLst.length; i++) {
		if (!(dirLst[i].attributes.RouteName in out)) {
			out[dirLst[i].attributes.RouteName] = [];
		}
		var toAdd = {"dir": dirLst[i].attributes.Text, "dist": dirLst[i].attributes.DriveDistance, "time": dirLst[i].attributes.ElapsedTime};
		out[dirLst[i].attributes.RouteName].push(toAdd);
	}
	return out;
}

$(document).ready(function() { 

	var URL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_directions?f=json&token=${sessionStorage.getItem('token')}`
	$.getJSON(URL, function(data) {
		console.log(data);
		var dirLst = data.value.features
		var out = makeDirs(dirLst);
		var nav = sendToNav(dirLst);
		console.log(out);
		var accordion = `<div class="accordion" id="accordionExample">`;
		for (key in out) {
			accordion +=    `<div class="card">
    							<div class="card-header" id="${key.replace(/\s/g, '')}">
      								<div class="row">
        								<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#${key.replace(/\s/g, '')}collapse" aria-expanded="true" aria-controls="collapseOne">
          									${key}
        								</button>
        								<button class="btn btn-secondary ml-auto sendToNav" type="button" href="" id="${key}" disabled>Open in Navigator</button>
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
	$('.sendToNav').each(function() {
		var href = 'arcgis-navigator://?';
		var thisObject = nav[$(this).prop('id')]
		for (key in thisObject) {
			href + `stop=${thisObject[key].lat},${thisObject[key].long}&stopname=${thisObject[key].stopName}&`
		}
		$(this).prop('href', href.slice(0, -1));
		$(this).prop('disabled', false);
	});
});