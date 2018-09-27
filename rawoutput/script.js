function setDisplay(collapsed, item) {
  collapsed ? item.className = 'hide' : item.className = '';
}

function displayData(data, el) {
  var par = document.createElement('ul');
 
  for (var i = 0; i<data.length; i++) {
    var item = document.createElement('li');
		var li = par.appendChild(item);
    
    item.innerHTML = data[i].value;
    
    //set initial display from data
    setDisplay(data[i].collapsed, item.parentNode);
    
    li.addEventListener('click', function(e){
      var child = e.target.children[0];
      if(child && child.classList.value == 'hide') {
          setDisplay(false, child);
        } else {
          setDisplay(true, child);
        }
      e.stopPropagation();
      })
    
    el.appendChild(par);
    
    if (data[i].children) {
      displayData(data[i].children, li);  
		}
	}
}

$(document).ready(function() {
	var url = `https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/${sessionStorage.getItem('jobid')}/${sessionStorage.getItem('json')}/?f=json&token=${sessionStorage.getItem('token')}`
	$.getJSON(url, function(data) {
		var root = document.getElementById('container');
		displayData(data, root);
	});
});