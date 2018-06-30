'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var RestaurantSchema = Schema({
	nombre:String,
	descripcion:String,
	horario:String,
	tipo_cocina:String,
	direccion:String,
	imagen:String,
	user: {type: Schema.ObjectId, ref:'User'}

});

module.exports = mongoose.model('Restaurant',RestaurantSchema);