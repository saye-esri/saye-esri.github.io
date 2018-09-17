$(document).ready(function(){
	var client_id = "cDEbMgKnRUKN85YW";
	var redirect_uri =  "file:///C:/Users/saye/Desktop/demo/index.html";
	window.location.href = `https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`
});