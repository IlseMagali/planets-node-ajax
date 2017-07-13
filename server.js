// express es una dependencia que utilizamos, por eso es require
var express = require("express");
var path = require("path");
//anexar o enviar archivos, para eso sirve path
var app = express();
// cuando montamos el servidor, debe ser rápido en su ejecución
//express no hace públicos nuestros archivos, por eso con esta instrucción
// le indicamos a express que es lo que queremos que si muestre
// app (que es express) use, hace referencia a usar,
// express.static realiza una ruta estática para que genere un patrón de la ruta para accesar a
// los archivos que quiero mostrar
app.use('/data', express.static(path.join(__dirname,'data')));
// express.static son palabras reservadas de express, y podemos usarlo porque tenemos una variable que es express
app.use('/static', express.static(path.join(__dirname,'js')));
// get es un método http, que para hacer una petición que hace el navegador
app.get("/", function(req, res){
	//funcion es acción, la acción es que mande un archivo que está en el directorio base "/", para devolvernos el index.html
	res.sendFile(__dirname + "/index.html");
});
// el servidor esta en este puerto y se puede acceder a él, así:
app.listen(8080);
