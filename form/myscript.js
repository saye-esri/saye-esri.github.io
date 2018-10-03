function parseURLParams(url) {
	var queryStart = url.indexOf("#") + 1,
	    queryEnd   = url.length + 1,
	    query = url.slice(queryStart, queryEnd - 1),
	    pairs = query.replace(/\+/g, " ").split("&"),
	    parms = {}, i, n, v, nv;

	if (query === url || query === "") return;

	for (i = 0; i < pairs.length; i++) {
	    nv = pairs[i].split("=", 2);
	    n = decodeURIComponent(nv[0]);
	    v = decodeURIComponent(nv[1]);
	    if (!parms.hasOwnProperty(n)) parms[n] = [];
	    parms[n].push(nv.length === 2 ? v : null);
	}
	console.log(parms);
	return parms;
}



function dateToUTC(str) {
	var strarr = str.split('/');
	return Date.UTC(strarr[2], strarr[0],strarr[1]);
}


function setTime(str) {
	var today = new Date();
	var dd, mm, yyyy, timearr;
	dd = today.getDay();
	mm = today.getMonth() + 1;
	yyyy = today.getFullYear();
	timearr = str.split(":")
	return new Date(yyyy, mm, dd, timearr[0], timarr[1]);
}



function separate(lst) {
	var o = {"features":[]};
	var dict = {"attributes": {}, "geometry": {}};
	for (var i = 0; i < lst.length; i++) {
		if (lst[i].value == "") continue;
		var currentForm = Number(lst[i].id.slice(-1));;
		if (o.features.length+1 < currentForm) {
			o.features.push(dict);
			dict = {"attributes": {}, "geometry": {}};
		}
		if (lst[i].id.slice(5, 6) == "x" || lst[i].id.slice(5,6) == "y") {
			dict["geometry"][lst[i].id.slice(5,6)] = Number(lst[i].value);
		} else {
			isNaN(lst[i].value) ? dict["attributes"][lst[i].id.slice(5, -1)] = lst[i].value:
								  dict["attributes"][lst[i].id.slice(5, -1)] = Number(lst[i].value);
		}
	}
	o.features.push(dict)
	console.log(o);
	return o
}

function separateRoute(lst) {
	var o = {"features":[]};
	var dict = {"attributes" : {}};
	console.log(lst);
	for (var i = 0, l = lst.length; i < l; i++) {
		if (lst[i].value == "") continue;
		var currentForm = Number(lst[i].id.slice(-1));
		if (o.features.length+1 < currentForm) {
			o.features.push(dict);
			dict = {"attributes" : {}};
		}
		isNaN(lst[i].value) ? dict["attributes"][lst[i].id.slice(5, -1)] = lst[i].value:
							  dict["attributes"][lst[i].id.slice(5, -1)] = Number(lst[i].value);
	}
	o.features.push(dict)
	console.log(o);
	return o
}


$(document).ready(function(){  
	//either restore saved default or clear all values
	var def = localStorage.getItem('formDefault');
	if (def) {
		$('#allTabs').replaceWith(JSON.Parse(localStorage.getItem('formDefault')));
		def = null;
	} else {
		$('input[type=text]').val(''),
		$('input[type=number]').val('');
	}


	//get URL parameters and redirect if there arent any
	var params = parseURLParams(window.location.href);
	if (params == null) {
	alert('invalid token')
	window.location.href = "/";
	}

	//populate job history tab and remove old jobs
	sessionStorage.setItem("token", params.access_token[0]);
	var oneDay = 60*60*24*1000;
	var now = new Date();
	var history = JSON.parse(localStorage.getItem('jobhistory'));
    var newJobHistory = {};
    for (var key in history) {
        var utc = Date.parse(key);
        var timestamp = new Date(utc);
        if (now.getTime() > timestamp.getTime() + oneDay) continue;
        var newhtml = `<a href="/processing" class="dropdown-item historyButton" id="${history[key]}">Job on ${timestamp.toDateString()} at ${timestamp.toTimeString().slice(0,8)}</a>`;
        $('#joblist').append(newhtml);
        newJobHistory[timestamp] = history[key];
    }
    localStorage.setItem('jobhistory', JSON.stringify(newJobHistory));


    //populate input pattern values for form verification
	$('.needs-pattern').change(function() {
		var regex = `^(`
    	var depotLst = $('input[id^=depotName]');
    	var lstLength = depotLst.length;
    	depotLst.each(function(index, element) {
    		regex += $(this).val();
    		if (index < lstLength -1) {
    			regex += `|`;
    		}
    	});
    	regex += `)$`
    	$('.needs-pattern').not('input[id^=depotName]').prop('pattern', regex);
	});

	//submit form function
    $('#submit').click(function() {
    	//check form validity
    	var forms = $('.needs-validation');
    	var submit = true;
    	for (i = 0; i < forms.length; i++) {
    		if (forms[i].checkValidity() === false) submit = false;
    		forms[i].classList.add('was-validated');
    	}
    	if (submit) {
      		//translate form information into correct format
	    	var or, dp, rt, genDir;
	    	or = JSON.stringify(separate($('#orderForm').find('input').not('input[type=button]')));
	    	dp = JSON.stringify(separate($('#depotForm').find('input').not('input[type=button]')));
	    	rt = JSON.stringify(separateRoute($('#routeForm').find('input').not('input[type=button]')));
	    	genDir = JSON.stringify($('#genDir').is(':checked'));
	    	console.log($('#genDir').is(':checked'));
	    	console.log($('#datepicker').val());
	    	console.log(params.access_token[0]);
	    	//send post request
	    	var inputParameters = { orders: or, 
	        			depots: dp, 
	        			routes: rt,
	        			distance_units: "Kilometers",
	        			time_zone_usage_for_time_fields: "UTC",
	        			f: "pjson",
	        			token: params.access_token[0],
	        			populate_directions: genDir,
	        			impedance: $('#impedance').val()
					};
			if ($('datepicker').val()) inputParameters['default_date'] = dateToUTC($('#datepicker').val());
			console.log(inputParameters);
			$.ajax({
	        	url: "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/submitJob",
	        	type: "POST",
	        	data: inputParameters,
	        	dataType: "json",
	        	success: function (result) {
	        		sessionStorage.setItem("jobid", result.jobId);
	        		sessionStorage.setItem("directions", $('#genDir').is(':checked'));
	        		var history = JSON.parse(localStorage.getItem('jobhistory'));
	        		if (history == null) history = {};
	        		var now = new Date();
	        		history[now] = result.jobId;
	        		localStorage.setItem('jobhistory', JSON.stringify(history));
	        		if (result.jobStatus == "esriJobSubmitted") window.location.href = '/processing';
	       		},
	        	error: function (xhr, ajaxOptions, thrownError) {
	        	alert(xhr.status);
	        	alert(thrownError);
	       		}
			});	
		}
	});
});


