$(document).ready(function() {

    function parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
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
        return parms;
    }

    var params = parseURLParams(window.location.href);
    var checkURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${params.jobID}?returnMessages=true&f=json&token=${params.token}`

    var myP = `Your job ID is: ${params.jobID}<br>Job JSON can be found <a href="${checkURL}">here</a><br>`;

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
            var ddURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${params.jobID}/${outLst[key]["paramUrl"]}?f=json&token=${params.token}`
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
            } else if (data.jobStatus == "esriJobFailed" || data.jobStatus == "esriJobTimedOut") {
                $('message').prop('class', 'text-danger').html('Job failed, view JSON for more details.');
                if (timer) clearInterval(timer);
                rawJSON(data);
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


});