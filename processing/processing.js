$(document).ready(function() {

    $('#tooltip').tooltip('disable');

    var checkURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}?returnMessages=true&f=pjson&token=${sessionStorage.getItem('token')}`

    var myP = `Your job ID is: ${sessionStorage.getItem('jobid')}<br>Job JSON can be found <a href="${checkURL}">here</a><br>`;

    $('#replace').html(myP);

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

    var timer;
    function checkData() {
        $.getJSON(checkURL, function(data) {
            var realError = JSON.stringify(data).includes('WARNING 030088');
            if (data.jobStatus == "esriJobSucceeded" && !(realError)) {
                if (timer) clearInterval(timer);
                $('#viewMap').prop('disabled', false);
                $('#message').prop('class', 'text-success').html('Job completed successfully!');
                $('#canDelete').html('See job status below');
                $('h1').html('Processing Complete');
                rawJSON(data);
                $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_directions?f=pjson&token=${sessionStorage.getItem('token')}`, function(data) {
                    if (data.value.features.length > 0) {
                        $('#viewDir').prop('disabled', false);
                    } else {
                    $('#viewDir').css('pointer-events', 'none');
                    $('#tooltip').tooltip('enable');
                    }
                });
            } else if (data.jobStatus == "esriJobFailed" || data.jobStatus == "esriJobTimedOut" || realError) {
                $('h1').html('Processing Complete');
                $('#canDelete').html('See job status below');
                $('#message').prop('class', 'text-danger').html('Job failed, view JSON for more details.');
                if (timer) clearInterval(timer);
                rawJSON(data);
            } else if (data.error.message == "Invalid Token") {
                alert('Invalid Token');
                window.location.href = "/";
            }else return false;
        });
    }
    if (!(checkData())) {
        var timer = setInterval(function() {
            checkData();
        }, 3000);
    };
    
    $('#viewMap').click(function(){
        window.location.href = '/map';
    });

    $('#viewDir').click(function() {
        window.location.href = '/directions';
    });


});