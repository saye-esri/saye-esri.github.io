var processTimer, uploadTimer;

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
                $('#progressbar').css('width', '75%');
                $('#progresslabel').html('Publishing features');
                publish(statusResult.itemId, data);
            } else if (statusResult.status === "processing") {
                return false;
            }
        }
    });
};

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
};

function complete(data) {
    $('#viewMap').prop('disabled', false);
    $('#progressbar').css('width', '100%').removeClass('progress-bar-animated');
    $('#progresslabel').prop('class', 'text-success').html('Job complete');
    rawJSON(data);
    $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_directions?f=pjson&token=${sessionStorage.getItem('token')}`, function(data) {
        if (data.value.features.length > 0) {
            $('#viewDir').prop('disabled', false);
        } else {
        $('#viewDir').css('pointer-events', 'none');
        $('#tooltip').tooltip('enable');
        }
    });
};

function checkData(checkURL) {
    $.getJSON(checkURL, function(data) {
        var realError = JSON.stringify(data).includes('WARNING 030088');
        var n = sessionStorage.getItem('AGOLName')
        console.log(data);
        if (data.jobStatus == "esriJobSucceeded" && !(realError)) {
            if (processTimer) clearInterval(processTimer);
            if (n) {
                $('#progressbar').css('width', '50%');
                $('#progresslabel').html('Solution found adding item to ArcGIS Online');
                $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_route_data?f=pjson&token=${sessionStorage.getItem('token')}`, function(g) {
                    sendToAGOL(g.value.url, data);
                });
            } else {
                complete(data);
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
};

$(document).ready(function() {
    $('#tooltip').tooltip('disable');
    var checkURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}?returnMessages=true&f=pjson&token=${sessionStorage.getItem('token')}`
    var myP = `Job JSON can be found <a href="${checkURL}">here</a><br>`;
    $('#replace').html(myP);

    if(sessionStorage.getItem('AGOLName')) {
        $('#progressbar').css('width', '25%');
    } else {
        $('#progressbar').css('width', '50%');
    }
    
    if (!(checkData(checkURL))) {
        processTimer = setInterval(function() {
            checkData(checkURL);
        }, 1000);
    }
    
    $('#viewMap').click(function(){
        window.location.href = '/map';
    });

    $('#viewDir').click(function() {
        window.location.href = '/directions';
    });
});