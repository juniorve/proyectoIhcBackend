'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes= require('./routes/user_routes');
var evento_routes= require('./routes/evento_routes');
var comentario_routes= require('./routes/comentario_routes');

//configuracion body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // convierte a objeto JSON los datos que nos llegan por las peticiones HTTP

// configurar cabeceras HTTP
app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin','*');     
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
	res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

	next();
});

// rutas bases;
app.use('/api',user_routes);
app.use('/api',evento_routes);
app.use('/api',comentario_routes);

module.exports = app; // para usar express en otros ficheros que incluyan app
