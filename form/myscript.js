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


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function removeAll() {
    $('.removerButton').each(function(button) {
        for (i = 1, l = $(this).parent().children().length-2; i<l; i++) {
            $(this).trigger('click');
        }
    });
}


$(document).ready(function(){  

	var map, view, mysearch, searchResult;

	$('.removerButton').prop('disabled','disabled');

    $('#datepicker').datepicker({
            uiLibrary: "bootstrap4"
    });



    $('.adderButton').click(function() {
        var num = $(this).parent().children().length-2;    // how many "duplicatable" input fields we currently have
        var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added
        var type = $(this).parent().prop('id').slice(0, -4) + 'Input';
        var digits = -1 * num.toString().length;

        // create the new element via clone(), and manipulate it's ID using newNum value
        var oldElem = $(this).parent().find('#'+type + num)//.children('#'+type+'Form'+num);
        var newElem = oldElem.clone().prop('id', type + newNum);
        newElem.find('.btn-group').not(':first').remove();
        newElem.find('[id^=Geocode]').html('Find Lat/Long')
        newElem.css('border-left', '2px solid' + getRandomColor())

        var oldElemid = oldElem.find('[id]');
        newElem.find('[id]').each(function(index) {
            var curNewElem = $(this);
            var curOldElem = oldElemid.eq(index);
            curNewElem.prop('id', curOldElem.prop('id').slice(0, digits) + newNum);
            curNewElem.val("");

            if (curNewElem.prop('nodeName') == "H5") curNewElem.prop('innerHTML', curOldElem.prop('innerHTML').slice(0, digits) + newNum);
            if (curNewElem.prop('nodeName') == "LABEL") curNewElem.prop('for', curOldElem.prop('for').slice(0, digits) + newNum);
        });

        // insert the new element after the last "duplicatable" input field
        $('#'+ type + num).after(newElem);

        // enable the "remove" button
        $(this).next().prop('disabled','');

        // scroll animation and cancel handler       
        var page = $('html, body'); 
        page.stop();
        page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
            console.log('event');
            page.stop();
        });
        

        page.animate({scrollTop: newElem.offset().top}, {
            duration: 'slow', 
            complete: function(){
                page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
            },
            fail: function() {
                page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
            }
        });


        // business rule: you can only add 5 names
        //if (newNum == 5)
           // $('#' + type + 'Add').prop('disabled','disabled');
    });

    $('.removerButton').click(function() {
        $('html, body').animate({scrollTop: ($(this).prevAll().eq(2).top)}, 700);
        var num    = $(this).parent().children().length-2; // how many "duplicatable" input fields we currently have
        var type = $(this).parent().prop('id').slice(0, -4) + 'Input';

        $('#'+ type + num).remove();        // remove the last element

        // enable the "add" button
        $('#'+ type + 'Del').prop('disabled','');

        // if only one element remains, disable the "remove" button
        if (num-1 == 1)
            $('#' + type + 'Del').prop('disabled','disabled');
    });
    
	//either restore saved default or clear all values
	var def = localStorage.getItem('formDefault');
	if (def) {
		console.log(JSON.parse(def));
		stateObject = JSON.parse(def)
		for (i = 0, l = stateObject.Orderslen; i < l; i++) {
			$('#orderInputAdd').trigger('click');
		}
		for (i = 0, l = stateObject.Depotslen; i < l; i++) {
			$('#depotInputAdd').trigger('click');
		}
		for (i = 0, l = stateObject.Routeslen; i < l; i++) {
			$('#routeInputAdd').trigger('click');
		}
		for (key in stateObject.Data) {
			$('#' + key).val(stateObject.Data[key])
		}
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

	require([
	    "esri/Map",
	    "esri/views/MapView",
	    "esri/widgets/Search",
	    "dojo/domReady!"
    	], function(Map, MapView, Search) {

        map = new Map({
            basemap: "streets"
        });
      
        view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-79.38543999999997,43.648690000000045],
            zoom: 10
        });
      
        mysearch = new Search({
            view:view
        });
      
        view.ui.add(mysearch, "top-right")
      
        
        mysearch.on("select-result", function(event){
            searchResult = event;
            console.log(searchResult);
            $('.errortext').html('');
        });
    });

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

    $('body').on('click', "[id^=Geocode]", function(){
    	var geo = $(this)
    	console.log(geo);
        mysearch.clear();
        searchResult = null;
        $('#myModal').modal('show');
        var parent = $(this).closest('.clonedInput');
        var field = parent.prop('id').slice(0, 5);
        $('#btnSave').off('click');
        $('#btnSave').click(function(){
            if (searchResult) { 
                console.log(searchResult);
                //console.log($('#' + sessionStorage.getItem('parentID')).children("input[id^=x]"));
                parent.find(`input[id^=${field}x]`).val(searchResult.result.feature.geometry.longitude);
                parent.find(`input[id^=${field}y]`).val(searchResult.result.feature.geometry.latitude);
                geo.siblings().first().html(`${searchResult.result.name.split(',')[0]}`);
                geo.siblings().not(':first').remove();
                geo.after(geo.clone().html('edit'))
                geo.siblings().first().prop('disabled', true);
                $('#myModal').modal('hide');
            } else {
                $('.errortext').html("No address selected")
            }
        });
    });

    
    $('body').on('click', ".historyButton", function(){
        var newid = $(this).prop('id');
        sessionStorage.setItem('jobid', newid);
    });

    $('#saveDefault').click(function() {
        var stateObject = {
            Orderslen: $('#orderForm').children().length-3,
            Depotslen: $('#depotForm').children().length-3,
            Routeslen: $('#routeForm').children().length-3,
            Data: {}
        }
        $('input').not('input[type=button]').each(function() {
            stateObject.Data[$(this).prop('id')] = $(this).val()
        })
        localStorage.setItem('formDefault', JSON.stringify(stateObject));
    });
        
    $('#clearDefault').click(function() {
    	localStorage.removeItem('formDefault')
    })

    //temp function for testing purposes
    $('#fill').click(function() {
        removeAll();
        $('#routeInputAdd').trigger('click');
        for (var i = 0; i < 5; i++) {
            $('#orderInputAdd').trigger('click');
        }
        var order1 = $('#orderInput1');
        order1.find('#orderName1').val('CN Tower');
        order1.find('#orderServiceTime1').val(5);
        order1.find('#orderDeliveryQuantities1').val(200);
        order1.find('#orderx1').val(-79.386529);
        order1.find('#ordery1').val(43.64175);
        var order2 = $('#orderInput2');
        order2.find('#orderName2').val('Pearson Airport');
        order2.find('#orderDeliveryQuantities2').val(300);
        order2.find('#orderx2').val(-79.6100499);
        order2.find('#ordery2').val(43.69571);
        var order3 = $('#orderInput3');
        order3.find('#orderName3').val('Scarborough');
        order3.find('#orderDeliveryQuantities3').val(400);
        order3.find('#orderx3').val(-79.256659);
        order3.find('#ordery3').val(43.77223);
        var order4 = $('#orderInput4');
        order4.find('#orderName4').val('Square One');
        order4.find('#orderDeliveryQuantities4').val(500);
        order4.find('#orderx4').val(-79.64057);
        order4.find('#ordery4').val(43.59298);
        var order5 = $('#orderInput5');
        order5.find('#orderName5').val('Distillery District');
        order5.find('#orderDeliveryQuantities5').val(600);
        order5.find('#orderx5').val(-79.356089);
        order5.find('#ordery5').val(43.6516);
        var order6 = $('#orderInput6');
        order6.find('#orderName6').val('Richmond Hill');
        order6.find('#orderDeliveryQuantities6').val(700);
        order6.find('#orderx6').val(-79.378489);
        order6.find('#ordery6').val(43.84745);
        var depot1 = $('#depotInput1');
        depot1.find('#depotName1').val('My Depot');
        depot1.find('#depotx1').val(-79.330626);
        depot1.find('#depoty1').val(43.730256);
        var route1 = $('#routeInput1')
        route1.find('#routeName1').val('Truck 1');
        route1.find('#routeCapacities1').val(2000);
        route1.find('#routeStartDepotName1').val('My Depot');
        route1.find('#routeEndDepotName1').val('My Depot');
        var route2 = $('#routeInput2');
        route2.find('#routeName2').val('Truck 2');
        route2.find('#routeCapacities2').val(2001);
        route2.find('#routeStartDepotName2').val('My Depot');
        route2.find('#routeEndDepotName2').val('My Depot');
    });


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


