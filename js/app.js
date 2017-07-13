//promises: una forma de realizar acciones basadas en otras acciones de manera asíncrona
// 1. obtener a un json que tenía un contenido que es la data de los planetas, más general
// 2. los planetas eran rutas de las que podías obtener más información, más particular de un planeta
var template = "<div class='row'>"+ "<div class='col s12 m7'>" +
	"<div class='card horizontal'>"+
		"<div class='card-image'>"+
			"<img src='https://lorempixel.com/100/190/nature/6'>"+
		"</div>"+
	"<div class='card-stacked'>"+
		"<div class='card-content'>"+
			"<p>'__planet__'</p>"+
			"<p>'__year-of-discovering__'</p>"+
			"<p>'__telescope__'</p>"+
		"</div>"+
	"</div>"+
	"</div>"+
"</div>"+ "</div>";

function getJSON (url) {
	return new Promise (function(resolve, reject){

		var ajax = new XMLHttpRequest();
		ajax.open("GET", url);
		ajax.send();

		ajax.onreadystatechange = function (){
			if(ajax.readyState == 4){
				var response = JSON.parse(ajax.responseText);
				resolve(response);
			}
		};
	})

}
getJSON("/data/earth-like-results.json")
.then(function(response){
	return Promise.all(response.results.map(getJSON));
})
.then(function(results){
	var finalTemplate = " ";
	results.forEach(function(result){
		var planetName = result.pl_name;
		var planetYearOfDiscover = result.pl_disc;
		var planetTelescope = result.pl_telescope;

		finalTemplate += template.replace('__planet__', planetName).replace('__year-of-discovering__', planetYearOfDiscover).replace('__telescope__', planetTelescope);
	})
	document.getElementById("planets-container").innerHTML = finalTemplate;
});
