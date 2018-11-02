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
    return Date.UTC(strarr[2], strarr[0]-1,strarr[1]);
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

function separate(query) {
    var out, dict, dictTemplate;
    out = {"features":[]};
    ($(query).find('[id^=Geocode]').length > 0) 
    ? dictTemplate = function() {
        return {"attributes": {}, "geometry": {}} 
    }
    : dictTemplate = function() {
        return {"attributes" : {}};
    }
    $(query).find('form').each(function(i) {
        dict = new dictTemplate();
        var digits = -1 * i.toString().length;
        $(this).find('input,select').each(function(index, elem) {
            if (String($(elem).val()).length != 0) {
                if ($(elem).hasClass('lat')) {
                    dict.geometry.y = $(elem).val();
                } else if ($(elem).hasClass('long')) {
                    dict.geometry.x = $(elem).val();
                } else {
                    isNaN($(elem).val()) ? dict.attributes[$(elem).prop('id').slice(5, digits)] = $(elem).val():
                                         dict.attributes[$(elem).prop('id').slice(5, digits)] = Number($(elem).val());
                }
            }
        });
        out.features.push(dict);
    });
    return out
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

var allDom = {
    order:{
        ServiceTime: {
            id: 'orderServiceTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderServiceTimeLabel1" for="orderServiceTime1">Service Time</label>
                            <input type="number" id="orderServiceTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        TimeWindowStart1: {
            id: 'orderTimeWindowStart11',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderTimeWindowStart1Label1" for="orderTimeWindowStart11">Time Window Start 1</label>
                            <input type="text" id="orderTimeWindowStart11" class="form-control" placeholder="9:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        TimeWindowEnd1: {
            id: 'orderTimeWindowEnd11',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderTimeWindowEnd1Label1" for="orderTimeWindowEnd11">Time Window End 1</label>
                            <input type="text" id="orderTimeWindowEnd11" class="form-control" placeholder="15:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        TimeWindowStart2: {
            id: 'orderTimeWindowStart21',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderTimeWindowStart2Label1" for="orderTimeWindowStart21">Time Window Start 2</label>
                            <input type="text" id="orderTimeWindowStart21" class="form-control" placeholder="9:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        TimeWindowEnd2: {
            id: 'orderTimeWindowEnd21',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderTimeWindowEnd2Label1" for="orderTimeWindowEnd21">Time Window End 2</label>
                            <input type="text" id="orderTimeWindowEnd21" class="form-control" placeholder="15:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        MaxViolationTime1: {
            id: 'orderMaxViolationTime11',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderMaxViolationTime1Label1" for="orderMaxViolationTime11">Max Violation Time 1</label>
                            <input type="number" id="orderMaxViolationTime11" class="form-control" placeholder="30">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        MaxViolationTime2: {
            id: 'orderMaxViolationTime21',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderMaxViolationTime2Label1" for="orderMaxViolationTime21">Max Violation Time 2</label>
                            <input type="number" id="orderMaxViolationTime21" class="form-control" placeholder="30">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`

        },
        DeliveryQuantities: {
            id: 'orderDeliveryQuantities1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderDeliveryQuantitiesLabel1" for="orderDeliveryQuantities1">Delivery Quantity</label>
                            <input type="number" id="orderDeliveryQuantities1" class="form-control" placeholder="50">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        PickupQuantities: {
            id: 'orderPickupQuantites1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderPickupQuantitiesLabel1" for="orderPickupQuantities1">Pickup Quantity</label>
                            <input type="number" id="orderPickupQuantities1" class="form-control" placeholder="50">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`

        },
        Revenue: {
            id: 'orderRevenue1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderRevenueLabel1" for="orderRevenue1">Revenue</label>
                            <input type="number" id="orderRevenue1" class="form-control" placeholder="50">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        SpecialtyNames: {
            id: 'orderSpecialtyNames1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderSpecialtyNamesLabel1" for="orderSpecialtyNames1">Specialty Names</label>
                            <input type="text" id="orderSpecialtyNames1" class="form-control" placeholder="50">
                        </div>`
        },
        AssignmentRule: {
            id: 'orderAssignmentRule1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderAssignmentRuleLabel1" for="orderAssignmentRule1">Assignment Rule</label>
                            <select type="select" id="orderAssignmentRule1" class="form-control">
                                <option value="0">Exclude</option>
                                <option value="1">Preserve route and relative sequence</option>
                                <option value="2">Preserve route</option>
                                <option value="3" selected>Override</option>
                                <option value="4">Anchor First</option>
                                <option value="5">Anchor Last</option>
                            </select>
                        </div>`
        },
        CurbApproach: {
            id: 'orderCurbApproach1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderCurbApproachLabel1" for="orderCurbApproach1">Curb Approach</label>
                            <select type="select" id="orderCurbApproach1" class="form-control">
                                <option value="0" selected>Either side of vehicle</option>
                                <option value="1">Right side of vehicle</option>
                                <option value="2">Left side of vehicle</option>
                                <option value="3">No U-turns</option>
                            </select>
                        </div>`
        },
        RouteName: {
            id: 'orderRouteName1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderRouteNameLabel1" for="orderRouteName1">Route Name</label>
                            <input type="text" id="orderRouteName1" class="form-control" placeholder="Truck 1">
                        </div>`
        },
        Sequence: {
            id: 'orderSequence1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="orderSequenceLabel1" for="orderSequence1">Sequence</label>
                            <input type="number" id="orderRouteName1" class="form-control" placeholder="Truck 1">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        }
    },
    depot:{
        TimeWindowStart1: {
            id: 'depotTimeWindowStart11',
            DOMContent: `<div class="form-group mr-3">
                            <label id="depotTimeWindowStart1Label1" for="depotTimeWindowStart11">Time Window Start 1</label>
                            <input type="text" id ="depotTimeWindowStart11" class="form-control" placeholder="8:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        TimeWindowEnd1: {
            id: 'depotTimeWindowEnd11',
            DOMContent: `<div class="form-group mr-3">
                            <label id="depotTimeWindowEnd1Label1" for="depotTimeWindowEnd11">Time Window End 1</label>
                            <input type="text" id="depotTimeWindowEnd11" class="form-control" placeholder="14:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        TimeWindowStart2: {
            id: 'depotTimeWindowStart21',
            DOMContent: `<div class="form-group mr-3">
                            <label id="depotTimeWindowStart2Label1" for="depotTimeWindowStart21">Time Window Start 2</label>
                            <input type="text" id ="depotTimeWindowStart21" class="form-control" placeholder="8:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        TimeWindowEnd2: {
            id: 'depotTimeWindowEnd21',
            DOMContent: `<div class="form-group mr-3">
                            <label id="depotTimeWindowEnd1Label1" for="depotTimeWindowEnd11">Time Window End 2</label>
                            <input type="text" id="depotTimeWindowEnd11" class="form-control" placeholder="14:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        CurbApproach: {
            id: 'depotCurbApproach1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="depotCurbApproachLabel1" for="depotCurbApproach1">Curb Approach</label>
                            <select type="select" id="depotCurbApproach1" class="form-control">
                                <option value="0" selected>Either side of vehicle</option>
                                <option value="1">Right side of vehicle</option>
                                <option value="2">Left side of vehicle</option>
                                <option value="3">No U-turns</option>
                            </select>
                        </div>`
        },
        Bearing: {
            id: 'depotBearing',
            DOMContent: `<div class="form-group mr-3">
                            <label id="depotBearingLabel1" for="depotBearing1">Bearing</label>
                            <input type="number" id="depotBearing1" class="form-control" placeholder="15">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        BearingTol: {
            id: 'depotBearingTol1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="depotBearingLabel1" for="depotBearing1">Bearing</label>
                            <input type="number" id="depotBearing1" class="form-control" placeholder="15">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        }
    },
    route:{
        StartDepotName: {
            id: 'routeStartdepotName1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeStartDepotNameLabel1" for="routeStartDepotName1">Start Depot</label>
                            <input type="text" id="routeStartDepotName1" class="form-control needs-pattern" placeholder="My Depot" required>
                            <div class="invalid-feedback">Must match a depot name</div>
                        </div>`
        },
        EndDepotName: {
            id: 'routeEndDeptName1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeEndDepotNameLabel1" for="routeEndDepotName1">End Depot</label>
                            <input type="text" id="routeEndDepotName1" class="form-control needs-pattern" placeholder="My Depot" required>
                            <div class="invalid-feedback">Must match a depot name</div>
                        </div>`
        },
        StartDepotServiceTime: {
            id: 'routeStartdepotServiceTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeStartDepotServiceTimeLabel1" for="routeStartDepotServiceTime1">Start Depot Service Time</label>
                            <input type="number" id="routeStartDepotServiceTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        EndDepotServiceTime: {
            id: 'routeEndDepotServiceTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeEndDepotServiceTimeLabel1" for="routeEndDepotServiceTime1">End Deopt Service Time</label>
                            <input type="number" id="routeEndDepotServiceTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        EarliestStartTime: {
            id: 'routeEarliestStartTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeEarliestStartTimeLabel1" for="routeEarliestStartTime1">Earliest Start Time</label>
                            <input type="text" id="depotTimeWindowEnd11" class="form-control" placeholder="14:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        LatestStartTime: {
            id: 'routeLatestStartTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeLatestStartTimeLabel1" for="routeLatestStartTime1">Latest Start Time</label>
                            <input type="text" id="routeLatestStartTime1" class="form-control" placeholder="14:00" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]">
                            <div class="invalid-feedback">Field must be empty or in 24H time</div>
                        </div>`
        },
        Capacities: {
            id: 'routeCapacities1',
            DOMContent: `<div class="form-group mr-2">
                            <label id="routeCapacitiesLabel1" for="routeCapacities1">Capacity</label>
                            <input type="number" id="routeCapacities1" class="form-control" placeholder="50" />
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        FixedCost: {
            id: 'routeFixedCost1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeFixedCostLabel1" for="routeFixedCost1">Fixed Cost</label>
                            <input type="number" id="routeFixedCost1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        CostPerUnitTime: {
            id: 'routeCostPerUnitTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeCostPerUnitTimeLabel1" for="routeCostPerUnitTime1">Cost Per Unit Time</label>
                            <input type="number" id="routeCostPerUnitTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        CostPerUnitDistance: {
            id: 'routeCostPerUnitDistance1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeCostPerUnitDistanceLabel1" for="routeCostPerUnitDistance1">Cost Per Unit Distance</label>
                            <input type="number" id="routeCostPerUnitDistance1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`

        },
        OverTimeStartTime: {
            id: 'routeOverTimeStartTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeOverTimeStartTimeLabel1" for="routeOverTimeStartTime1">Over Time Start Time</label>
                            <input type="number" id="routeOverTimeStartTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        CostPerUnitOverTime: {
            id: 'routeCostPerUnitOverTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeCostPerUnitOverTimeLabel1" for="routeCostPerUnitOverTime1">Cost Per Unit Overtime</label>
                            <input type="number" id="routeCostPerUnitOverTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        MaxOrderCount: {
            id: 'routeMaxOrderCount1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeMaxOrderCountLabel1" for="routeMaxOrderCount1">Max Order Count</label>
                            <input type="number" id="routeMaxOrderCount1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        MaxTotalTime: {
            id: 'routeMaxTotalTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeMaxTotalTimeLabel1" for="routeMaxTotalTime1">Max Total Time</label>
                            <input type="number" id="routeMaxTotalTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        MaxTotalTravelTime: {
            id: 'routeMaxTotalTravelTime1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeMaxTotalTravelTimeLabel1" for="routeMaxTotalTravelTime1">Max Total Travel Time</label>
                            <input type="number" id="routeMaxTotalTravelTime1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        MaxTotalDistance: {
            id: 'routeMaxTotalDistance1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeMaxTotalDistanceLabel1" for="routeMaxTotalDistance1">Max Total Distance</label>
                            <input type="number" id="routeMaxTotalDistance1" class="form-control" placeholder="20">
                            <div class="invalid-feedback">Field must be empty or a number</div>
                        </div>`
        },
        SpecialtyNames: {
            id: 'routeSpecialtyNames1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeSpecialtyNamesLabel1" for="routeSpecialtyNames1">Specialty Names</label>
                            <input type="text" id="routeSpecialtyNames1" class="form-control" placeholder="Low clearance">
                        </div>`
        },
        AssignmentRule: {
            id: 'routeAssignmentRule1',
            DOMContent: `<div class="form-group mr-3">
                            <label id="routeAssignmentRuleLabel1" for="routeAssignmentRule1">Assignment Rule</label>
                            <select type="select" id="orderAssignmentRule1" class="form-control">
                                <option value="1" selected>Include route</option>
                                <option value="2">Exclude route</option>
                            </select>
                        </div>`
        }

    }
}


$(document).ready(function(){  

    //either restore saved default or clear all values
    var def = JSON.parse(localStorage.getItem('formDefault'));
    if (def != null) {
        for (key in def) {
            $('#'+key).html(def[key])
        }
    } else {
        $('input[type=text]').val(''),
        $('input[type=number]').val('');
        $('.removerButton').prop('disabled','disabled');
    }


    var map, view, mysearch, searchResult;

    

    $('#datepicker').datepicker({
            uiLibrary: "bootstrap4"
    });

    $("input:checkbox").prop('checked', false);


    $('#paramPicker').children('.boxLst').each(function() {
        var toAdd = '';
        var cur = $(this).prop('id').slice(0,5)
        for (key in allDom[cur]) {
            toAdd += `<div class="form-group form-check mr-4">
                        <input type="checkbox" class="form-check-input" id="check${cur}${key}">
                        <label class="form-check-label" for="check${cur}${key}">${key}</label>
                    </div>`
        }
        $(this).html(toAdd);
    });

    $('.adderButton').click(function() {
        var num = $(this).parent().children().length-2;    // how many "duplicatable" input fields we currently have
        var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added
        var type = $(this).parent().prop('id').slice(0, -4) + 'Input';
        var digits = -1 * num.toString().length;

        // create the new element via clone(), and manipulate it's ID using newNum value
        var oldElem = $(this).parent().find('#'+type + num)//.children('#'+type+'Form'+num);
        var newElem = oldElem.clone().prop('id', type + newNum);
        newElem.find('.btn-group').children().not(':first').remove();
        newElem.find('[id^=Geocode]').html('Find Lat/Long').prop('disabled', false);
        newElem.css('border-left', '2px solid' + getRandomColor())

        var oldElemid = oldElem.find('[id]');
        newElem.find('[id]').each(function(index) {
            var curNewElem = $(this);
            var curOldElem = oldElemid.eq(index);
            curNewElem.prop('id', curOldElem.prop('id').slice(0, digits) + newNum);
            if (curNewElem.prop('nodeName') != "SELECT") curNewElem.val("");
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
            basemap: "streets-navigation-vector"
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
    sessionStorage.setItem("user", params.username[0]);
    var oneDay = 60*60*24*1000;
    var now = new Date();
    var history = JSON.parse(localStorage.getItem('jobhistory'));
    var newJobHistory = {};
    for (var key in history) {
        var utc = Date.parse(key);
        var timestamp = new Date(utc);
        if (now.getTime() > timestamp.getTime() + oneDay) continue;
        var newhtml = `<a href="/processing" class="dropdown-item historyButton" id="${history[key]['id']}" value="${history[key]['params']}">Job on ${timestamp.toDateString()} at ${timestamp.toTimeString().slice(0,8)}</a>`;
        $('#joblist').append(newhtml);
        newJobHistory[timestamp] = history[key];
    }
    localStorage.setItem('jobhistory', JSON.stringify(newJobHistory));

    $('body').on('click', "[id^=Geocode]", function(){
        var geo = $(this).parent().children();
        console.log(geo);
        mysearch.clear();
        searchResult = null;
        $('#myModal').on('shown.bs.modal', function() {
            mysearch.focus();
        });
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
                geo.first().html(`${searchResult.result.name.split(',')[0]}`);
                geo.not(':first').remove();
                geo.first().after(geo.first().clone().html('edit').prop('disabled', false))
                geo.first().prop('disabled', true);
                $('#myModal').modal('hide');
            } else {
                $('.errortext').html("No address selected")
            }
        });
    });

    $('#openParam').on('click', function() {
        $('#paramModal').modal('show');
        $('#paramPicker').children('.boxLst').each(function() {
            $(this).find('input').each(function(i, elem) {
                if ($( '#'+$(elem).prop('id').slice(5)+'1' ).length > 0) {
                    $(elem).prop('checked', true);
                } else {
                    $(elem).prop('checked', false);
                }
            });
        });
        $('#saveParam').on('click', function() {
            removeAll();
            $('#paramPicker').children('.boxLst').each(function() {
                var cur = $(this).prop('id').slice(0,5);
                $($(this).find('input').get().reverse()).each(function(i, el) { 
                    var inName = $(el).prop('id').slice(5);
                    if ($(el).prop('checked') && $('#'+inName+'1').length===0) {
                        var toAdd = allDom[cur][inName.slice(5)]['DOMContent'];
                        $('#' + cur + 'Name1').parent().after(toAdd);
                    } else if (! $(el).prop('checked')) {
                        $('#'+inName+'1').parent().remove();
                    }
                });
            });
            $('#paramModal').modal('hide');
        });
    });

    
    $('body').on('click', ".historyButton", function(){
        sessionStorage.setItem('jobrequest', $(this).val());
        sessionStorage.setItem('jobid', $(this).prop('id'));
    });

    $('#paste').click(function() {
        var value = $('#pasteBox').val();
        if (value.length > 0) {
            sessionStorage.setItem('jobid', value);
            window.location.href = '/processing'
        }
    });

    $('input:file').change(function() {
        var file = $(this).prop('files')[0];
        Papa.parse(file, {
            header: true,
            trimHeaders: true,
            dynamicTyping: false,
            complete: function(result, file) {
                console.log(result)
                result.data.forEach(function(elem, i) {
                    for (key in elem) {
                        let cur = elem[key];
                        if (cur) {
                            if (i+1 > $(`#${key.slice(0,5)}Form`).children().length-2) {
                                $(`#${key.slice(0,5)}InputAdd`).trigger('click');
                                console.log('added: ' +key.slice(0,5));
                            }
                            let id = `#${key}${String(i+1)}`
                            $(id).val(cur);
                            console.log(`set ${id} to ${cur}`);
                        }
                    }
                });
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
    

    $('#saveDefault').click(function() {
        var obj = {};
        $('input').each(function() {
            $(this).attr('value', $(this).val());
        })
        $('#allTabs').children(':not(#extras)').each(function() {
            obj[$(this).prop('id')] = $(this).html();
        });
        localStorage.setItem('formDefault', JSON.stringify(obj));
        location.reload();
    });
        
    $('#clearDefault').click(function() {
        localStorage.removeItem('formDefault');
        location.reload();
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
            ($('#toAGOLCheck').is(':checked')) ? sessionStorage.setItem('AGOLName', $('#toAGOL').val() + '_VRPSolver') : 
                                                 sessionStorage.removeItem('AGOLName');
            //translate form information into correct format
            var or, dp, rt, genDir, toAGOL;
            or = JSON.stringify(separate('#orderForm'));
            dp = JSON.stringify(separate('#depotForm'));
            rt = JSON.stringify(separate('#routeForm'));
            genDir = JSON.stringify($('#genDir').is(':checked'));
            toAGOL = JSON.stringify($('#toAGOLCheck').is(':checked'));
            console.log($('#genDir').is(':checked'));
            console.log($('#datepicker').val());
            console.log(params.access_token[0]);
            //send post request
            var inputParameters = { 
                orders: or, 
                depots: dp, 
                routes: rt,
                distance_units: "Kilometers",
                time_zone_usage_for_time_fields: "UTC",
                f: "pjson",
                token: params.access_token[0],
                save_route_data: toAGOL,
                populate_directions: genDir,
                impedance: $('#impedance').val()
            };
            if ($('#datepicker').val() != '') inputParameters['default_date'] = dateToUTC($('#datepicker').val());
            console.log(inputParameters);
            $.ajax({
                url: "https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/submitJob",
                type: "POST",
                data: inputParameters,
                dataType: "json",
                success: function (result) {
                    if ('error' in result) {
                        console.log(result);
                        alert('invalid token')
                        window.location.href = "/";
                    }
                    sessionStorage.setItem("jobid", result.jobId);
                    var history = JSON.parse(localStorage.getItem('jobhistory'));
                    if (history == null) history = {};
                    var now = new Date();
                    history[now] = {id: result.jobId, params: inputParameters}
                    localStorage.setItem('jobhistory', JSON.stringify(history));
                    if (result.jobStatus == "esriJobSubmitted") {
                        sessionStorage.setItem('jobrequest', JSON.stringify(inputParameters));
                        window.location.href = '/processing';
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
                }
            }); 
        }
    });
});

