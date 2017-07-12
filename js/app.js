function getJSON (url) {
	return new Promise (function(resolve, error){
		var ajax = new XMLHttpRequest();
		// var url = "/data/earth-like-results.json";
		ajax.open("GET", url);
		ajax.send();

		ajax.onreadystatechange = function (){
			if(ajax.readyState == 4){
				var response = JSON.parse(ajax.responseText);
				// var url = "/data/earth-like-results.json";
				// no es necesario tener la variable url porque esta como parámetro en la función getJSON
				resolve(response);
				console.log(ajax.responseText);
			}
		};
	})
}
getJSON("/data/earth-like-results.json")
.then(function(response){
	return getJSON(response.results[0]);
})
.then(function(responsePlanet){
	console.log(responsePlanet);
	var container = document.getElementById("planets-container");
	container.textContent = responsePlanet.pl_name;
});
