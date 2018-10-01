function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

$(document).ready(function(){  


    $('.removerButton').prop('disabled','disabled');

    $('#datepicker').datepicker({
            uiLibrary: "bootstrap4"
        });

    function removeAll() {
        $('.removerButton').each(function(button) {
            for (i = 1, l = $(this).parent().children().length-2; i<l; i++) {
                $(this).trigger('click');
            }
        });
    }


    require([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Search",
        "dojo/domReady!"
        ], function(Map, MapView, Search) {

            var map = new Map({
                basemap: "streets-navigation-vector"
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
                $('.errortext').html('');
            });
        
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


        $('.adderButton').click(function() {
            var num = $(this).parent().children().length-2;    // how many "duplicatable" input fields we currently have
            var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added
            var type = $(this).parent().prop('id').slice(0, -4) + 'Input';
            var digits = -1 * num.toString().length;

            // create the new element via clone(), and manipulate it's ID using newNum value
            var oldElem = $(this).parent().find('#'+type + num)//.children('#'+type+'Form'+num);
            var newElem = oldElem.clone().prop('id', type + newNum);
            newElem.css('border-left', '2px solid' + getRandomColor())

            var oldElemid = oldElem.find('[id]');
            newElem.find('[id]').each(function(index) {
                var curNewElem = $(this);
                var curOldElem = oldElemid.eq(index);
                curNewElem.prop('id', curOldElem.prop('id').slice(0, digits) + newNum);
                if (curNewElem.prop('type') != "button") curNewElem.val("");
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


       $('body').on('click', "[id^=Geocode]", function(){
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
            console.log($('#allTabs').clone());
            localStorage.setItem('formDefault', $('#allTabs').clone())
        });
    });
});
