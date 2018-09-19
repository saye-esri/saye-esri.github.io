$(document).ready(function(){   


    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Search",
        "dojo/domReady!"
        ], function(Map, MapView, Search) {

            var map = new Map({
                basemap: "topo-vector"
            });
          
            var view = new MapView({
                container: "viewDiv",
                map: map,
                center: [-79.38543999999997,43.648690000000045],
                zoom: 10
            });
          
            var mysearch = new Search({
                view:view
            });
          
            view.ui.add(mysearch, "top-right")
          
            var searchResult;
            mysearch.on("select-result", function(event){
                searchResult = event;
            });


    
        $('#datepicker').datepicker({
            uiLibrary: "bootstrap4"
        });

        $('#fill').click(function() {
            var order1 = $('#orderInput1');
            order1.find('#orderName1').val('Store1');
            order1.find('#orderServiceTime1').val(5);
            order1.find('#orderDeliveryQuantities1').val(200);
            order1.find('#orderx1').val(-122.51);
            order1.find('#ordery1').val(37.7724);
            var order2 = $('#orderInput2');
            order2.find('#orderName2').val('Store2');
            order2.find('#orderDeliveryQuantities2').val(900);
            order2.find('#orderx2').val(-122.4889);
            order2.find('#ordery2').val(37.7538);
            var depot1 = $('#depotInput1');
            depot1.find('#depotName1').val('Depot1');
            depot1.find('#depotx1').val(-122.3943);
            depot1.find('#depoty1').val(37.7967);
            var route1 = $('#routeInput1');
            route1.find('#routeName1').val('big ass truck');
            route1.find('#routeCapacities1').val(2000);
            route1.find('#routeStartDepotName1').val('Depot1');
            route1.find('#routeEndDepotName1').val('Depot1');

        });


        $('body').on('click', "[id^=Geocode]", function(){
            mysearch.clear();
            console.log($("[id^=Geocode]"));
            $('#myModal').modal('show');
            var parentID = $(this).closest('.clonedInput').attr('id');
            sessionStorage.setItem("parentID", parentID)  
        });

        $('.adderButton').click(function() {
            console.log($(this).parent());
            var num = $(this).parent().children().length-2;    // how many "duplicatable" input fields we currently have
            var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added
            var type = $(this).parent().prop('id').slice(0, -4);
            console.log(type)
            console.log(num)

            // create the new element via clone(), and manipulate it's ID using newNum value
            var oldElem = $(this).parent().find('#'+type+'Input'+num)//.children('#'+type+'Form'+num);
            var newElem = oldElem.clone().prop('id', type +'Input'+ newNum);
            console.log(oldElem);
            //console.log(newElem.children());

            // manipulate the name/id values of the input inside the new element
            for (i = 0; i < newElem.find('[id]').length; i++) {

                //if (newElem.children().eq(i)[0].is()) continue;
                var curNewElem = newElem.find('[id]').eq(i);
                var curOldElem = oldElem.find('[id]').eq(i);
                curNewElem.prop('id', curOldElem.prop('id').slice(0, -1) + newNum)
                if (curNewElem.prop('type') != "button") curNewElem.val("");
                if (curNewElem.prop('nodeName') == "H5") curNewElem.prop('innerHTML', curOldElem.prop('innerHTML').slice(0, -1) + newNum);
                if (curNewElem.prop('nodeName') == "LABEL") curNewElem.prop('for', curOldElem.prop('for').slice(0, -1) + newNum);
            }

            // insert the new element after the last "duplicatable" input field
            $('#'+ type +'Input'+ num).after(newElem);

            // enable the "remove" button
            $(this).next().prop('disabled','');

            // business rule: you can only add 5 names
            //if (newNum == 5)
               // $('#' + type + 'Add').prop('disabled','disabled');
        });

        $('.removerButton').click(function() {
            var num    = $(this).parent().children().length-2; // how many "duplicatable" input fields we currently have
            var type = $(this).prev().prev().prop('id').slice(0, -1);   

            $('#'+ type + num).remove();        // remove the last element

            // enable the "add" button
            $('#'+ type + 'Del').prop('disabled','');

            // if only one element remains, disable the "remove" button
            if (num-1 == 1)
                $('#' + type + 'Del').prop('disabled','disabled');
        });


        $('.removerButton').prop('disabled','disabled');

        $('#btnSave').click(function(){
                if (searchResult) { 
                    //console.log(searchResult);
                    console.log($('#' + sessionStorage.getItem('parentID')));
                    var field = sessionStorage.getItem('parentID').slice(0, 5);
                    console.log(field);
                    //console.log($('#' + sessionStorage.getItem('parentID')).children("input[id^=x]"));
                    $('#' + sessionStorage.getItem('parentID')).find(`input[id^=${field}x]`).val(searchResult.result.feature.geometry.longitude);
                    $('#' + sessionStorage.getItem('parentID')).find(`input[id^=${field}y]`).val(searchResult.result.feature.geometry.latitude);
                    $('#myModal').modal('hide');
                } else {
                    $('.modal-footer').append("<br><p style='colour: red'> No address selected</p>")
                }
        });
    
    });
});


/*      OLD CODE FROM BEFORE
    $('.adderButton').click(function() {
        var num = $(this).parent().prev().length;    // how many "duplicatable" input fields we currently have
        var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added
        var type = $(this).parent().prev().prop('id').slice(0, -1);

        // create the new element via clone(), and manipulate it's ID using newNum value
        var oldElem = $('#'+ type + num)
        var newElem = oldElem.clone().prop('id', type + newNum);
        //console.log(newElem.children('.head h3'));
        //console.log(newElem.children());

        // manipulate the name/id values of the input inside the new element
        for (i = 0; i < newElem.find('[id]').length-1; i++) {
            //if (newElem.children().eq(i)[0].is()) continue;
            var curNewElem = newElem.find('[id]').eq(i);
            var curOldElem = oldElem.find('[id]').eq(i);
            curNewElem.prop('id', curOldElem.prop('id').slice(0, -1) + newNum)
            if (curNewElem.prop('type') != "button") curNewElem.val("");
            if (curNewElem.prop('nodeName') == "H3") curNewElem.prop('innerHTML', curOldElem.prop('innerHTML').slice(0, -1) + newNum);
        }

        // insert the new element after the last "duplicatable" input field
        $('#'+ type + num).after(newElem);

        // enable the "remove" button
        $('#' + type + 'Del').prop('disabled','');

        // business rule: you can only add 5 names
        if (newNum == 5)
            $('#' + type + 'Add').prop('disabled','disabled');
    });
*/
    

///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
$('#btnAddDepot').click(function() {
        var num        = $('.depotClonedInput').length;    // how many "duplicatable" input fields we currently have
        var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added

        // create the new element via clone(), and manipulate it's ID using newNum value
        var oldElem = $('#depotInput' + num)
        var newElem = oldElem.clone().prop('id', 'depotInput' + newNum);

        // manipulate the name/id values of the input inside the new element
        for (i = 0; i < newElem.find('[id]').length-1; i++) {
            //if (newElem.children().eq(i)[0].is()) continue;
            var curNewElem = newElem.find('[id]').eq(i);
            var curOldElem = oldElem.find('[id]').eq(i);
            curNewElem.prop('id', curOldElem.prop('id').slice(0, -1) + newNum)
            if (curNewElem.prop('type') != "button") curNewElem.val("");
            if (curNewElem.prop('nodeName') == "H3") curNewElem.prop('innerHTML', curOldElem.prop('innerHTML').slice(0, -1) + newNum);
        }

        // insert the new element after the last "duplicatable" input field
        $('#depotInput' + num).after(newElem);

        // enable the "remove" button
        $('#btnDelDepot').prop('disabled','');

        // business rule: you can only add 5 names
        if (newNum == 5)
            $('#btnAddDepot').prop('disabled','disabled');
    });

    $('#btnDelDepot').click(function() {
        var num    = $('.depotClonedInput').length;    // how many "duplicatable" input fields we currently have
        $('#depotInput' + num).remove();        // remove the last element

        // enable the "add" button
        $('#btnAddDepot').prop('disabled','');

        // if only one element remains, disable the "remove" button
        if (num-1 == 1)
            $('#btnDelDepot').prop('disabled','disabled');
    });


    $('#btnDelDepot').prop('disabled','disabled');

///////////////////////////////////////////////////////////////////////////////////////////////////////////

$('#btnAddRoute').click(function() {
        var num        = $(this).parent().prev().length;    // how many "duplicatable" input fields we currently have
        var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added

        // create the new element via clone(), and manipulate it's ID using newNum value
        var oldElem = $('#routeInput' + num)
        var newElem = oldElem.clone().prop('id', 'routeInput' + newNum);

        // manipulate the name/id values of the input inside the new element
        for (i = 0; i < newElem.find('[id]').length-1; i++) {
            //if (newElem.children().eq(i)[0].is()) continue;
            var curNewElem = newElem.find('[id]').eq(i);
            var curOldElem = oldElem.find('[id]').eq(i);
            curNewElem.prop('id', curOldElem.prop('id').slice(0, -1) + newNum)
            if (curNewElem.prop('type') != "button") curNewElem.val("");
            if (curNewElem.prop('nodeName') == "H3") curNewElem.prop('innerHTML', curOldElem.prop('innerHTML').slice(0, -1) + newNum);
        }

        // insert the new element after the last "duplicatable" input field
        $('#routeInput' + num).after(newElem);

        // enable the "remove" button
        $('#btnDelRoute').prop('disabled','');

        // business rule: you can only add 5 names
        if (newNum == 5)
            $('#btnAddRoute').prop('disabled','disabled');
    });

    $('#btnDelRoute').click(function() {
        var num    = $('.routeClonedInput').length;    // how many "duplicatable" input fields we currently have
        $('#routeInput' + num).remove();        // remove the last element

        // enable the "add" button
        $('#btnAddRoute').prop('disabled','');

        // if only one element remains, disable the "remove" button
        if (num-1 == 1)
            $('#btnDelRoute').prop('disabled','disabled');
    });


    $('#btnDelRoute').prop('disabled','disabled');
*/

