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

var params = parseURLParams(window.location.href);
sessionStorage.setItem("token", params.access_token[0]);

$(document).ready(function(){  
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

    $('#submit').click(function() {
    	var forms = $('.needs-validation');
    	var submit = true;
    	for (i = 0; i < forms.length; i++) {
    		if (forms[i].checkValidity() === false) submit = false;
    		forms[i].classList.add('was-validated');
    	}
    		
    	if (submit) {
    
    	
	    	var or, dp, rt, client_id, client_secret, client_credentials;
	    	or = JSON.stringify(separate($('#orderForm').find('input').not('input[type=button]')));
	    	dp = JSON.stringify(separate($('#depotForm').find('input').not('input[type=button]')));
	    	rt = JSON.stringify(separateRoute($('#routeForm').find('input').not('input[type=button]')));
	    	console.log($('#genDir').is(':checked'));
	    	console.log($('#datepicker').val());
			$.ajax({
	        	url: "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/submitJob",
	        	type: "POST",
	        	data: { orders: or, 
	        			depots: dp, 
	        			routes: rt,
	        			distance_units: "Kilometers",
	        			time_zone_usage_for_time_fields: "UTC",
	        			f: "JSON",
	        			token: params.access_token[0],
	        			populate_directions: $('#genDir').is(':checked'),
	        			default_date: dateToUTC($('#datepicker').val())

					},
	        	dataType: "json",
	        	success: function (result) {
	        		alert(JSON.stringify(result));
	        		sessionStorage.setItem("jobid", result.jobId);
	        		sessionStorage.setItem("directions", $('#genDir').is(':checked'));
	        		var history = JSON.parse(localStorage.getItem('jobhistory'));
	        		console.log(history);
	        		if (history == null) history = {};
	        		var now = new Date();
	        		history[now] = result.jobId;
	        		localStorage.setItem('jobhistory', JSON.stringify(history));
	        		console.log(localStorage.getItem('jobhistory'));
	        		if (result.jobStatus == "esriJobSubmitted") window.location.href = '/processing';
	        		
	        		//window.location.href = "testmap.html";
	        	/*
	            	switch (result) {
	                	case true:
	                    	processResponse(result);
	                    	break;
	                	default:
	                    	resultDiv.html(result);
	            		}
	            		*/
	       		},
	        	error: function (xhr, ajaxOptions, thrownError) {
	        	alert(xhr.status);
	        	alert(thrownError);
	       		}
			});	
		}
	});
});

/*
function checkJob(result) {
	if (result.jobStatus == "esriJobSucceeded") {
		console.log(JSON.stringify(result));
		window.location.href = "testmap.html";
	} else if (result.jobStatus == "esriJobFailed") {
		alert("job failed");
		console.log(result);
	} else {
		var newResult = reloadData();
		document.getElementsByTagName('body')[0].innerHTML = JSON.stringify(newResult);
		setTimeout(function() {
			checkJob(newResult);}
			, 3000);
	}
}




function reloadData(){
    var result = null;
    $.ajax(
    	{async: false,
         url: `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${localStorage.getItem("jobID")}`,
         data: {"token" : `${localStorage.getItem("token")}`,
			    "returnMessages": "true",
			    "f": "json"},
         dataType: "json",
         success: function(data){
             result = data;
    	 }
	});	
    return result;
}


    	/*
		var url = makeurl("https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/submitJob", makedict("WWWasAhUr-J4slPbXp31dfWXRlsaUrjDqoAkDFTUDX_iFW3znypjTD-ABxH1kHZLfBf0zSyDtuiBETHIVfUlA_1QCnD5yUW7ftdZtXxt445TyO7rfVB-cXOy5zoiomPzjLbGlbrs1cl2TNqef3-eNA.."));
		console.log(url);

		var client = new HttpClient();
		client.get(url, function(response) {
		alert(response);
		});
//window.location.reload()
		return false;
		
	});
		
}); 

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

function makeurl(base, dict) {
	var myurl = base;
	var pos = 0;
	for (var key in dict) {
		var value = dict[key];
		if (pos != 0) {
			var append = "&" + key + "=" + value;
			myurl += append;
		} else {
			var append = key + "=" + value;
			myurl += append;
		}
		pos += 1;
	}
	console.log(myurl);
	return myurl;
}

function makedict(token) {
	console.log("making");
	var orders, depots, routes, f;
	orders = JSON.stringify(separate(document.querySelectorAll("#orderForm input[type=text]")));
	depots = JSON.stringify(separate(document.querySelectorAll("#depotForm input[type=text]")));
	routes = JSON.stringify(separate(document.querySelectorAll("#routeFrom input[type=text]")));
	f = "JSON";
	var dict = {
		"orders": orders,
		"depots": depots,
		"routes": routes,
		"f": f,
		"token": token
	};
	return dict;
}

*/ 

function dateToUTC(str) {
	var strarr = str.split('/');
	return Date.UTC(strarr[2], strarr[0],strarr[1]);
}

function allLetter(uname) { 
	var letters = /^[A-Za-z]+$/;
	if(uname.value.match(letters)) {
		return true;
	} else {
		alert('Username must have alphabet characters only');
		uname.focus();
		return false;
	}
}


function alphanumeric(uadd) { 
	var letters = /^[0-9a-zA-Z]+$/;
	if(uadd.value.match(letters)) {
		return true;
	} else {
		alert('User address must have alphanumeric characters only');
		uadd.focus();
		return false;
	}
}

/*
function countryselect(ucountry) {
	if(ucountry.value == "Default") {
alert('Select your country from the list');
ucountry.focus();
return false;
}
else
{
return true;
}
}
*/

function allnumeric(uzip) { 
	var numbers = /^[0-9]+$/;
	if(uzip.value.match(numbers)) {
		return true;
	} else {
		alert('ZIP code must have numeric characters only');
		uzip.focus();
		return false;
	}
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

/*
function ValidateEmail(uemail)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(uemail.value.match(mailformat))
{
return true;
}
else
{
alert("You have entered an invalid email address!");
uemail.focus();
return false;
}
} function validsex(umsex,ufsex)
{
x=0;

if(umsex.checked) 
{
x++;
} if(ufsex.checked)
{
x++; 
}
if(x==0)
{
alert('Select Male/Female');
umsex.focus();
return false;
}
else
{
console.log("gothere");

}
}
*/

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
	for (var i = 0; i < lst.length; i++) {
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

