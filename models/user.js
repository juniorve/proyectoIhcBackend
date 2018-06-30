'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var UsuarioSchema = Schema({
	name:String,
	surname:String,
	pais:String,
	role:String,
	email:String,
	password:String,
	estado:String
});

module.exports = mongoose.model('User',UsuarioSchema);