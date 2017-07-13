//una forma de realizar acciones basadas en otras acciones de manera asíncrona
// 1. obtener a un json que tenía un contenido que es la data de los planetas, más general
// 2. los planetas eran rutas de las que podías obtener más información, más particular de un planeta
function getJSON (url) {
	// retornamos una promesa porque necesitamos el punto then para seguir haciendo uso de las promesas
	// una promesa es un objeto, que necesitamos que el return devuelva ese objeto con todo lo que es, con su estado
	return new Promise (function(resolve, reject){ // la promesa necesita saber que hacer, resolve y reject son estados de la promesa

		var ajax = new XMLHttpRequest(); // new XMLHttpRequest() (es un nuevo objeto) que es una nueva petición al servidor, es una instancia
		// una instancia del objeto XMLHttpRequest, este objeto te permite hacer peticiones a ajax
		ajax.open("GET", url); // open es el tipo de petición que se basa en el servidor, es como decir: "ajax vete preparando para hacer una petición get con la url que te voy a dar"
		ajax.send(); // "ya que te preparé, manda lo que te pedí para responder", es el encargado de hacer la petición

		ajax.onreadystatechange = function (){ // es un método de ajax onreadystatechange que está preguntando por un cambio de estado del ajax
			if(ajax.readyState == 4){
				var response = JSON.parse(ajax.responseText); // JSON.parse --> es para transformar esa respuesta textual (de tipo string) en un objeto
				// ajax.responseText --> es la respuesta del servidor con datos, de tipo string

				// var url = "/data/earth-like-results.json";
				// no es necesario tener la variable url porque esta como parámetro en la función getJSON

				resolve(response);// la acción del resolve es ejecutar la promesa
				console.log(ajax.responseText); // aparece el objeto que contiene a los json de cada planeta
				console.log(response);
			}
		};
	})
}
getJSON("/data/earth-like-results.json") // ibener el json con la ruta que se muestra aquí, la llamé por medio de express desde server.js
.then(function(response){// definir una función anónima permite que se compile y después se ejecute la función, si no lo hacemos
	// cuando el interprete lo lea, lo irá ejecutando al momento de que lo leé.
	return getJSON(response.results[0]);// results es el arreglo obtenido de otro json de un planeta en particular
	// el return permite que ese json pueda usarse en el siguiente then, pues es parámetro de la función anónima siguiente (function (responsePlanet))
})
.then(function(responsePlanet){ // lo mismo acá, se mete en una función el console.log para que
	// no se rompa la asincronía, después lo mostramos por medio de un console.log
	console.log(responsePlanet);
	var container = document.getElementById("planets-container");
	container.textContent = responsePlanet.pl_name;
});
