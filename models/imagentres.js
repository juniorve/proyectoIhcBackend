'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // permitira crear objetos de tipo esquema

var ImagentresSchema = Schema({
	nombre:String,
	descripcion:String,
	imagen:String,
	user: {type: Schema.ObjectId, ref:'User'},
	restaurant: {type: Schema.ObjectId, ref:'Restaurant'}

});

module.exports = mongoose.model('Imagentres',ImagentresSchema);