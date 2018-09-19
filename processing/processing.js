$(document).ready(function() {

    $('#tooltip').tooltip('disable');

    var checkURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}?returnMessages=true&f=json&token=${sessionStorage.getItem('token')}`

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
            var ddURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/${outLst[key]["paramUrl"]}?f=json&token=${sessionStorage.getItem('token')}`
            var ddItem = `<a class="dropdown-item" href="${ddURL}">${key}</a>`
            $('#ddItem').append(ddItem);
        }
        $('#rawJSON').prop('disabled', false);
    }

    var timer;
    function checkData() {
        $.getJSON(checkURL, function(data) {
            if (data.jobStatus == "esriJobSucceeded") {
                if (timer) clearInterval(timer);
                $('#viewMap').prop('disabled', false);
                $('#message').prop('class', 'text-success').html('Job completed successfully!')
                rawJSON(data);
                if (sessionStorage.getItem('directions') === 'true') {
                    console.log('enabled button');
                    $('#viewDir').prop('disabled', false);
                    $.getJSON(`https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/results/out_directions?f=json&token=${sessionStorage.getItem('token')}`, function(data) {
                        console.log(data);
                    })
                } else {
                    console.log('enabled tooltip');
                    $('#viewDir').css('pointer-events', 'none');
                    $('#tooltip').tooltip('enable');
                }
            } else if (data.jobStatus == "esriJobFailed" || data.jobStatus == "esriJobTimedOut") {
                $('#message').prop('class', 'text-danger').html('Job failed, view JSON for more details.');
                if (timer) clearInterval(timer);
                //rawJSON(data);
                console.log(data);
                alert("job failed"); 
            } else return false;
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