Array.prototype.last = function(){
    return this[this.length - 1];
};

Array.prototype.first = function() {
	return this[0];
};

Array.prototype.nextValid = function(index) {
	var i = index;
	while (true) {
		if ('geometry' in this[i]) {
			return this[i].geometry.paths[0].first()
			break;
		} else {
			i += 1;
		}
	}
}

Array.prototype.prevValid = function(index) {
	var i = index;
	while (true) {
		if ('geometry' in this[i]) {
			return this[i].geometry.paths[0].last()
			break;
		} else {
			i -= 1;
		}
	}
}

function convert(kmFloat) {
	if (kmFloat >= 0 && kmFloat <= 1) {
		return `${Math.round(kmFloat*1000)}m`;
	} else {
		return `${Math.round(kmFloat)}km`;
	}
}

function sendToNav(data) {
	var out = {};
	for (i = 0; i < data.length; i++) {
		if (!(data[i].attributes.RouteName in out)) {
			out[data[i].attributes.RouteName] = [];
		}
		if (data[i].attributes.Type === 18 && data[i].attributes.Text.slice(0,5) === 'Start') {
			var toAdd = {
				"stopName": data[i].attributes.Text.slice(9), 
				"long": data.nextValid(i)[0],
				"lat": data.nextValid(i)[1]
			};
			out[data[i].attributes.RouteName].push(toAdd);
		} else if (data[i].attributes.Type === 1) {
			console.log(data[i-1]);
			var toAdd = {
				"stopName": data[i].attributes.Text.slice(10).split(',')[0],
				"long": data.prevValid(i)[0],
				"lat": data.prevValid(i)[1]
			};
			out[data[i].attributes.RouteName].push(toAdd);
		}
	}
	return out;
}

function makeDirs(data) {
	var out = {};
	for (i = 0; i < data.length; i++) {
		if (!(data[i].attributes.RouteName in out)) {
			out[data[i].attributes.RouteName] = [];
		}
		var toAdd = {"dir": data[i].attributes.Text, "dist": data[i].attributes.DriveDistance, "time": data[i].attributes.ElapsedTime};
		out[data[i].attributes.RouteName].push(toAdd);
	}
	return out;
}

$(document).ready(function() { 

	var URL = `https://logistics.arcgis.com/arcgis/rest/services/World/Route/GPServer/FindRoutes/jobs/${sessionStorage.getItem('optimizeID')}/results/Output_Directions?f=json&token=${sessionStorage.getItem('token')}`
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
        								<a class="btn btn-secondary ml-auto sendToNav" role="button" id="${key}">Open in Navigator</a>
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
		$('.sendToNav').each(function() {
			var href = 'arcgis-navigator://?';
			var thisObject = nav[$(this).prop('id')]
			console.log(thisObject);
			for (i = 0, l = thisObject.length; i<l; i++) {
				href += `stop=${thisObject[i].lat},${thisObject[i].long}&stopname=${thisObject[i].stopName}&`;
			}
			var link = encodeURI(href.slice(0, -1));
			console.log(link);
			$(this).attr('href', link);
		});
	});
});