var processTimer, uploadTimer, optimizeTimer;

function sendToAGOL(geodatabase, data) {
    console.log(JSON.stringify(data));
    $.ajax({ //Create item in portal
        url: `https://www.arcgis.com/sharing/rest/content/users/${sessionStorage.getItem('user')}/addItem`,
        type: "post",
        dataType: "json",
        data: {
            dataUrl: geodatabase,
            title: sessionStorage.getItem('AGOLName'),
            token: sessionStorage.getItem('token'),
            f: 'pjson',
            overwrite: true,
            type: 'File Geodatabase'
        },
        success: function(result) {
            console.log(result);
            if (!checkUpload(result.id, data)) {
                uploadTimer = setInterval(function() {
                    checkUpload(result.id, data)
                }, 1000);
            }
        }
    });
};

function publish(itemID, data) {
    $.ajax({
        url: `https://www.arcgis.com/sharing/rest/content/users/${sessionStorage.getItem('user')}/publish`,
        type: "post",
        dataType: "json",
        data: {
            itemID: itemID,
            overwrite: true,
            fileType: 'fileGeodatabase',
            publishParameters: JSON.stringify({name: sessionStorage.getItem('AGOLName')}),
            token: sessionStorage.getItem('token'),
            f: "pjson"
        },
        success: function(result2) {
            sessionStorage.removeItem('AGOLName');
            complete(data);
            console.log(result2);
        }
    });
};

function checkOptimize(data) {
    console.log('checking');
    $.ajax({
        url: `https://logistics.arcgis.com/arcgis/rest/services/World/Route/GPServer/FindRoutes/jobs/${data.jobId}?token=${sessionStorage.getItem('token')}&returnMessages=true&f=json`,
        type: "get",
        success: function(response) {
            console.log(response);
            if (response.jobStatus === "esriJobSucceeded" ) {
                var history = JSON.parse(localStorage.getItem('jobhistory'))
                for (key in history) {
                    if (history[key]['id'] = sessionStorage.getItem('jobid')) {
                        history[key]['optimizeID'] = response.jobId;
                    }
                }
                localStorage.setItem('jobhistory', JSON.stringify('history'));
                console.log(response);
                sessionStorage.setItem('optimizeID', data.jobId);
                if (optimizeTimer) clearInterval(optimizeTimer);
                if (sessionStorage.getItem('AGOLName')) {
                    $('#progressbar').css('width', '60%');
                    $('#progresslabel').html('Adding item to ArcGIS Online');
                    $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/Route/GPServer/FindRoutes/jobs/${data.jobId}/results/Output_Route_Data?f=pjson&token=${sessionStorage.getItem('token')}`, function(g) {
                        sendToAGOL(g.value.url, data);
                    });
                } else {
                    complete(data)
                }
                return true
            } else if (response.jobStatus === "esriJobFailed") {
                alert('optimize failed')
                console.log(response);
                if (optimizeTimer) clearInterval(optimizeTimer);
                return true
            } else {
                return false;
            }
        }
    });
}

function checkUpload(itemID, data) {
    $.ajax({
        url: `https://www.arcgis.com/sharing/rest/content/users/${sessionStorage.getItem('user')}/items/${itemID}/status`,
        type: "post",
        dataType: 'json',
        data: {
            token: sessionStorage.getItem('token'),
            f: 'pjson'
        },
        success: function(statusResult) {
            if (statusResult.status === "completed") {
                if (uploadTimer) clearInterval(uploadTimer);
                $('#progressbar').css('width', '80%');
                $('#progresslabel').html('Publishing features');
                publish(statusResult.itemId, data);
            } else if (statusResult.status === "processing") {
                return false;
            }
        }
    });
}

function addGeometry(orders, depots, stops) {
  for (i = 0; i < stops.value.features.length; i++) {
    for (j = 0; j < orders.value.features.length; j++) {
      if (stops.value.features[i].attributes.Name == orders.value.features[j].attributes.Name) {stops.value.features[i].geometry = orders.value.features[j].geometry}
    }
    for (k = 0; k < depots.value.features.length; k ++) {
      if (stops.value.features[i].attributes.Name == depots.value.features[k].attributes.Name) {stops.value.features[i].geometry = depots.value.features[k].geometry}
    }
  }
  return stops;
}


function rawJSON(data) {
    var outLst = {};
    console.log(data);
    for (key in data) {
        if (typeof(data[key]) != 'object') continue;
        for (key2 in data[key]) {
            if (!("paramUrl" in data[key][key2])) continue;
            outLst[key2] = data[key][key2];
        }
    }
    console.log(outLst);
    for (key in outLst){
        var ddURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/${outLst[key]["paramUrl"]}?f=pjson&token=${sessionStorage.getItem('token')}`
        var ddItem = `<a class="dropdown-item" href="${ddURL}">${key}</a>`
        $('#ddItem').append(ddItem);
    }
    $('#rawJSON').prop('disabled', false);
}

function complete(data) {
    $('#viewMap').prop('disabled', false);
    $('#progressbar').css('width', '100%').removeClass('progress-bar-animated');
    $('#progresslabel').prop('class', 'text-success').html('Job complete');
    $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_directions?f=pjson&token=${sessionStorage.getItem('token')}`, function(data) {
        if (data.value.features.length > 0) {
            $('#viewDir').prop('disabled', false);
        } else {
        $('#viewDir').css('pointer-events', 'none');
        $('#tooltip').tooltip('enable');
        }
    });
    rawJSON(data);
}

function checkData(checkURL, iter) {
    $.getJSON(checkURL, function(data) {
        var realError = JSON.stringify(data).includes('WARNING 030088');
        console.log(data);
        if (data.jobStatus == "esriJobSucceeded" && !(realError)) {
            if (iter === 0) {
                complete(data)
            } else {
                var in_orders_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/orders?f=json&token=${sessionStorage.getItem("token")}`);
                var in_depots_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/inputs/depots?f=json&token=${sessionStorage.getItem("token")}`);
                var out_stops_p = $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem("jobid")}/results/out_stops?f=json&token=${sessionStorage.getItem("token")}`);
                Promise.all([in_orders_p, in_depots_p, out_stops_p]).then(function(lst) {
                    //Add geometry to stops, init vars
                    stopGeo = addGeometry(lst[0], lst[1], lst[2]);
                    sessionStorage.setItem('stops', JSON.stringify(stopGeo));
                    console.log(stopGeo);
                    $.ajax({
                        url: 'https://logistics.arcgis.com/arcgis/rest/services/World/Route/GPServer/FindRoutes/submitJob',
                        type: 'post',
                        data: {
                            token: sessionStorage.getItem('token'),
                            stops: JSON.stringify(stopGeo.value),
                            f: 'json',
                            save_route_data: sessionStorage.getItem('AGOLName') ? true: false,
                            populate_directions: sessionStorage.getItem('genDir')
                        },
                        success: function(data) {
                            console.log(data);
                            $('#progressbar').css('width', '40%');
                            $('#progresslabel').html('Optimizing Route');
                            if(!(checkOptimize(data))) {
                                optimizeTimer = setInterval(function() {
                                    checkOptimize(data);
                                }, 1000);
                            }
                        }
                    });
                });
                if (processTimer) clearInterval(processTimer);
            }
        } else if (data.jobStatus == "esriJobFailed" || data.jobStatus == "esriJobTimedOut" || realError) {
            $('#progresslabel').prop('class', 'text-danger').html('Job failed, view JSON for more details.');
            if (processTimer) clearInterval(processTimer);
            rawJSON(data);
        } else if ("error" in data && data.error.message == "Invalid Token") {
            alert('Invalid Token');
            window.location.href = "/";
        } else return false;
    });
}

$(document).ready(function() {
    $('#tooltip').tooltip('disable');
    var checkURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}?returnMessages=true&f=pjson&token=${sessionStorage.getItem('token')}`
    var myP = `Job JSON can be found <a href="${checkURL}">here</a><br>`;
    $('#replace').html(myP);

    $('#progressbar').css('width', '20%');
    var iter = 0;
    if (!(checkData(checkURL, iter))) {
        processTimer = setInterval(function() {
            iter += 1;
            checkData(checkURL, iter);
        }, 1000);
    }
    
    $('#viewMap').click(function(){
        window.location.href = '/map';
    });

    $('#viewDir').click(function() {
        window.location.href = '/directions';
    });
});