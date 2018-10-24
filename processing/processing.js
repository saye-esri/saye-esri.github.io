function sendToAGOL(name) {
    require(["esri/request"], function(esriRequest) {
        var url = `https://logistics.arcgis.com/arcgis/rest/directories/arcgisjobs/world/vehicleroutingproblem_gpserver/jdd29f1e32d674f698736bb1e2e60521a/scratch/_ags_rd92c37edcbd9e40df96c0b30fbf7bbe76_1526042620.zip`
        var formData = new FormData();
        formData.append("method", "post");
        formData.append("enctype", "multipart/form-data");
        formData.append("title", name);
        formData.append("dataUrl", url);

        esriRequest({
            url: `https://www.arcgis.com/sharing/rest/content/users/sayetp/addItem`,
            requestOptions: {
                method: "post",
                body: formData
            }
        }).then(function(response) {
            console.log(response);
        });
    });
}

$(document).ready(function() {

    $('#tooltip').tooltip('disable');

    var checkURL = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}?returnMessages=true&f=pjson&token=${sessionStorage.getItem('token')}`

    var myP = `Your job ID is: ${sessionStorage.getItem('jobid')} <a id="copy" class="text-primary">copy to clipboard</a><br>Job JSON can be found <a href="${checkURL}">here</a><br>`;

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
            var n = sessionStorage.getItem('AGOLName')
            if (data.jobStatus == "esriJobSucceeded" && !(realError)) {
                if (timer) clearInterval(timer);
                if (n) sendToAGOL(n);
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

    $('#copy').click(function() {
        const el = document.createElement('textarea');  // Create a <textarea> element
        el.value = sessionStorage.getItem('jobid');                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        el.style.position = 'absolute';                 
        el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        const selected =            
            document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0)     // Store selection if found
                : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
        }
        $(this).html('copied!')
    });
});