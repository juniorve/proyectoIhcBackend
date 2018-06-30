'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port = process.env.PORT || 3977; // PUERTO QUE TENDRA NUESTRO SERVIDOR WEB  DEL BACKEND

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://junior:junior1@ds141786.mlab.com:41786/desafiosdb', (err,res)=>{

//mongoose.createConnection('mongodb://localhost:27017/desafiosDB', (err,res)=>{
	if(err){ 
		console.log('error en la conexion');
		throw err;
		console.log(err);
	}else{

		console.log("La conexión a la base de datos está funcionando correctamente..");

		app.listen(port,function(){
			console.log("Servidor del api rest escuchando en http://localhost:"+port);
		});
	}
});
