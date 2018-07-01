'use strict'

var mongoose = require('mongoose');

var app = require('./app');
var port = process.env.PORT || 3977; // PUERTO QUE TENDRA NUESTRO SERVIDOR WEB  DEL BACKEND

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://junior:junior20@ds123181.mlab.com:23181/proyectoihcdb', (err,res)=>{

mongoose.connect('mongodb://localhost:27017/proyectoIhcDB', (err,res)=>{
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
